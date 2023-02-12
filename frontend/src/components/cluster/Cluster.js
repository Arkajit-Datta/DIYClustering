import React, { useState, useRef, useEffect, useCallback, useLayoutEffect } from 'react'
import { AnimatedTree } from 'react-tree-graph'
import 'react-tree-graph/dist/style.css'
import './styles.css'

import { baseURL, treeData as rootNode } from '../../store/data';
import { MenuItem, TextField, Typography } from '@mui/material';
import Loader from '../loader/Loader';

import axios from 'axios';

const DEFAULT_DEPTH = 9
const cloneWithDepth = (object, depth = DEFAULT_DEPTH) => {
    if (depth === -1) return undefined
    if (typeof object !== 'object') return object

    if (Array.isArray(object)) {
        return object
            .map((val) => cloneWithDepth(val, depth - 1))
            .filter((val) => val !== undefined)
    }

    const clone = {}

    for (const key in object) {
        if (typeof object['key'] === 'object' && depth - 1 === -1) {
            continue
        }

        const clonedValue = cloneWithDepth(object[key], depth - 1)

        if (clonedValue !== undefined) {
            clone[key] = clonedValue
        }
    }

    return clone
}



const useWindowInnerSize = () => {
    const [innerWidth, setInnerWidth] = useState(window.innerWidth)
    const [innerHeight, setInnerHeight] = useState(window.innerHeight)
    const hanldeResize = useCallback(() => {
        setInnerWidth(window.innerWidth)
        setInnerHeight(window.innerHeight)
    }, [])

    useEffect(() => {
        window.addEventListener('resize', hanldeResize)

        return () => window.removeEventListener('resize', hanldeResize)
    }, [hanldeResize])


    return {
        innerWidth,
        innerHeight,
    }
}
export default function Cluster({ darkMode }) {
    const [data, setData] = useState(cloneWithDepth(rootNode))
    const [path, setPath] = useState([rootNode.name])
    const [canvasWidth, setCanvasWidth] = useState(0)
    const [canvasHeight, setCanvasHeight] = useState(0)
    const { innerWidth, innerHeight } = useWindowInnerSize()
    const canvasWrapper = useRef(null)


    const [schema, setschema] = useState('');
    const [schemas, setschemas] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log("Calling tree for schema", schema);
        setLoading(true);
        // const timer = setTimeout(() => {
        //     setLoading(false)
        //     setData(cloneWithDepth(rootNode))
        // }, 2000);
        axios.get(baseURL + "/getTree/"+schema).then((response) => {
            setData(cloneWithDepth(response.data.data));
            setPath([response.data.data.name])
        }).finally(()=>{
            setLoading(false)
        });
    }, [schema]);

    useEffect(() => {
        console.log("Calling for all Schemas");
        setLoading(true);

        axios.get(baseURL + "/allEvent/").then((response) => {
            setschemas(response.data.data);
        }).finally(()=>{
            setLoading(false)
        });
    }, []);

    const findNode = (key, node = data, parentPath = []) => {
        const path = [...parentPath, node.name]
    
        if (node.name === key) {
            return { node: cloneWithDepth(node), path }
        }
    
        if (Array.isArray(node.children)) {
            for (const child of node.children) {
                const found = findNode(key, child, path)
    
                if (found) return found
            }
        }
    }

    const handleSchemaChange = (e) => {
        setschema(e.target.value);
    }

    const setCanvasSize = useCallback(() => {
        const { clientWidth, clientHeight } = canvasWrapper.current

        setCanvasWidth(clientWidth)
        setCanvasHeight(clientHeight)
    }, [])




    useEffect(setCanvasSize, [setCanvasSize])

    useLayoutEffect(() => {
        setCanvasWidth(0)
        setCanvasHeight(0)
    }, [innerWidth, innerHeight])

    useEffect(() => () => {
        let isMounted = true

        requestAnimationFrame(() => isMounted && setCanvasSize())

        return () => isMounted = false
    }, [innerWidth, innerHeight, setCanvasSize])

    const changeNode = ({ node, path }) => {
        setPath(path)
        setData(node)
    }
    const handleClick = (_, key) => {
        changeNode(findNode(key))
    }
    let handleClusterOpen = (ev, key) => {
        ev.preventDefault();
        console.log(path);
        let res = findNode(key);
        res.path.push(schema)
        window.open('/cluster/'+ res.path)
    }

    return (
        <div style={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            height: "100%",
        }}>
            <div style={{ height: "100%" }}>
                <div style={{ height: "100%", display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingInline: "2%" }}>
                    {path.map((path, index) => (
                        <button
                            style={{
                                margin: '0',
                                border: 'none',
                                outline: 'none',
                                background: 'none',
                                padding: '0 0.1rem',
                                cursor: data.name === path ? '' : 'pointer',
                                color: data.name === path ? (darkMode ? 'white' : 'black') : 'blue',
                            }}
                            key={path}
                            onClick={() => changeNode(findNode(path))}
                        >
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                {index > 0 && "+"} {path}
                            </Typography>
                        </button>
                    ))}
                    <TextField
                        id="outlined-basic"
                        select
                        style={{ width: '20%' }}
                        label="Select"
                        color='warning'
                        onChange={handleSchemaChange}
                        focused
                    >
                        {schemas.map((option, i) => (
                            <MenuItem key={i} value={option.name}>
                                <Typography style={{ color: darkMode ? 'rgb(0, 196, 144)' : 'black' }}>{option.name}</Typography>
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
            </div>
            {loading ? <Loader /> :
               data&& <div style={{ flexGrow: 1 }} ref={canvasWrapper}>
                    <AnimatedTree
                        animated
                        data={data}
                        width={1450}
                        height={1450}
                        nodeProps={{
                            "r": 20
                        }}
                        textProps={{
                            size: '50px',
                            transform: 'rotate(-90)',
                            fill: darkMode ? 'white' : 'black'
                        }}
                        nodeShape="circle"
                        svgProps={{ transform: 'rotate(90)' }}
                        gProps={{ className: 'node', onClick: handleClick, onContextMenu: handleClusterOpen }}
                        margins={{ top: 0, bottom: 140, left: 30, right: 950 }}
                    />
                </div>
            }
        </div>
    )
}
