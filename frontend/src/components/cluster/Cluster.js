import React, { useState, useRef, useEffect, useCallback, useLayoutEffect } from 'react'
import { AnimatedTree } from 'react-tree-graph'
import 'react-tree-graph/dist/style.css'
import './styles.css'

import { treeData as rootNode } from '../../store/data';
import { Typography } from '@mui/material';

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

const findNode = (key, node = rootNode, parentPath = []) => {
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
export default function Cluster({darkMode}) {
    const [data, setData] = useState(cloneWithDepth(rootNode))
    const [path, setPath] = useState([rootNode.name])
    const [canvasWidth, setCanvasWidth] = useState(0)
    const [canvasHeight, setCanvasHeight] = useState(0)
    const { innerWidth, innerHeight } = useWindowInnerSize()
    const canvasWrapper = useRef(null)
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

    return (
        <div style={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            height: "100%"
        }}>
            <div style={{ height: "100%" }}>
                <div style={{ height: "100%" }}>
                    {path.map((path, index) => (
                        <button
                            style={{
                                margin: '0',
                                border: 'none',
                                outline: 'none',
                                background: 'none',
                                padding: '0 0.1rem',
                                cursor: data.name === path ? '' : 'pointer',
                                color: data.name === path ? (darkMode?'white':'black') : 'blue',
                            }}
                            key={path}
                            onClick={() => changeNode(findNode(path))}
                        >
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                {index > 0 && "+"} {path}
                            </Typography>
                        </button>
                    ))}
                </div>
            </div>
            <div style={{ flexGrow: 1 }} ref={canvasWrapper}>
                <AnimatedTree
                    animated
                    data={data}
                    width={1600}
                    height={1600}
                    nodeProps={{
                        "r": 20
                    }}
                    textProps={{
                        size: '50px',
                        transform: 'rotate(-90)',
                        fill:darkMode?'white':'black'
                    }}
                    nodeShape="circle"
                    svgProps={{ transform: 'rotate(90)' }}
                    gProps={{ className: 'node', onClick: handleClick }}
                    margins={{ top: 0, bottom: 100, left: 60, right: 950 }}
                />
            </div>
        </div>
    )
}
