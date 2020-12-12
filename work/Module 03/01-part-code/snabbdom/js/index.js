import { h, init } from 'snabbdom'
import style from 'snabbdom/modules/style'
import classModules from 'snabbdom/modules/class'
import eventListeners from 'snabbdom/modules/eventlisteners'

// 导入数据模块，只读
import movieData from './data'

let cloneData = [...movieData]
let newRank = cloneData.length + 1
let sortMethod

// 注册模块
let patch = init([
    style,
    classModules,
    eventListeners
])

const app = document.querySelector('#app')

// 创建 container 
function view() {
    return h('div#container', {
        style: {
            color: '#fff',
            padding: '15px 25px'
        }
    }, [
        h('h1', "Top 10 movies"),
        h('div.header', {
            style: {
                height: '48px',
                lineHeight: '48px',
                marginTop: '10px'
            }
        }, [
            h('span.btns-group', {
                style: {
                    float: 'left'
                }
            },
                [
                    'Sort By：',
                    h('a.btn.rank', {
                        class: {
                            active: sortMethod === 'rank'
                        },
                        on: {
                            click: [sortDataFn, 'rank']
                        }
                    }, 'Rank'),
                    h('a.btn.title', {
                        class: {
                            active: sortMethod === 'title'
                        },
                        on: {
                            click: [sortDataFn, 'title']
                        }
                    }, 'Title'),
                    h('a.btn.desc', {
                        class: {
                            active: sortMethod === 'desc'
                        },
                        on: {
                            click: [sortDataFn, 'desc']
                        }
                    },  'Description'),
                ]),
            h('a.btn.add', {
                style: {
                    float: 'right'
                },
                on: {
                    click: addMovieFn
                }
            }, 'Add')
        ]),
        h('div.main-lists', {
            style: {
                clear: 'both'
            }
        }, cloneData.map(createRow))
    ])

}
// 使用新的vnode替换旧的vnode，更新视图
let oldVnode = patch(app, view())

// 新vnode 替换 旧vnode，更新视图
function render() {
    oldVnode = patch(oldVnode, view())
}
// 创建每一行的vnode
function createRow(movie) {
    return h('div.item', {
        key: movie.rank,
        style: {

        }
    }, [
        h('div.rank', {
            style: {
                width: '10%',
                fontWeight: 'bold'
            }
        }, movie.rank),
        h('div.title', {
            style: {
                width: '30%'
            }
        }, movie.title),
        h('div.desc', {
            style: {
                width: '60%'
            }
        }, movie.desc),
        h('a.del', {
            on: {
                click: [delMovieFn, movie]
            }
        }, 'X')
    ])
}

// 对象排序
function compare(property) {
    return function (a, b) {
        const value1 = a[property];
        const value2 = b[property];
        if (value1 > value2) {
            return 1
        } 
        if (value1 < value2) {
            return -1
        } 
        return 0
    }
}

// 按照 rank 排序
function sortDataFn(property) {
    sortMethod = property
    cloneData.sort(compare(property))
    render()
}
// 新增
function addMovieFn() {
    sortMethod = ''
    const m = movieData[Math.floor(Math.random() * 10)]
    cloneData = [{ rank: newRank++, title: m.title, desc: m.desc }].concat(cloneData)
    render()
}

// 删除
function delMovieFn(movie) {
    cloneData = cloneData.filter(m => {
        return m !== movie
    })
    render();
}