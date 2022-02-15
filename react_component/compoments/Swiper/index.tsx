import React, { FC, useEffect, useState, useCallback, useRef } from 'react';

import classNames from 'classnames';

import './index.scss';

// import Signleton from '../../utils/Signleton';


interface PrizeIprop {
  id: string,
  name: string,
  img: string,
  num: number
}

interface PrizeListIprop {
  list: PrizeIprop[], // 奖品数组
  perCount: number, // 每一行展示的奖品数
  showImg: boolean, // 是否展示图片
}

const Swiper: React.FC<PrizeListIprop> = ({
  list = [],
  perCount = 3,
  showImg = true
}: PrizeListIprop) => {
  const [distX, setX] = useState<number>(0)
  const [current, setCurrent] = useState<number>(0)
  const [itemW, setItemW] = useState<number>(0)

  const listDom = useRef(null);
  const listInner = useRef(null);

  const SwiperInfo = useRef(Object.create(null));

  const updateDomInfo = (isInit?: boolean) => {
    if (list.length <= 0) {
      return
    }
    let { list_s_w, ...rest } = SwiperInfo.current
    if (list_s_w <= 0 && listDom.current || isInit) {
      list_s_w = listDom.current?.clientWidth || 0
      setItemW(list_s_w / perCount)
      const list_i_w = list_s_w / perCount * list.length
      SwiperInfo.current = {...rest, list_s_w, list_i_w };
    }
    console.log(`swiperUpdateDom: ${list_s_w} - ${JSON.stringify(rest)}`)
  }

  const checkHandle = (type?: string) => {
    updateDomInfo()
    let { list_i_w, list_s_w, list_len, transformX, cur_idx, cur_max, ...rest } = SwiperInfo.current
    if (list_i_w <= 0 || list_s_w <= 0 || (list && list.length <= perCount) || list_len <= 0) {
      return
    }
    if (type === 'pre') {
      transformX += list_s_w
      transformX = transformX > 0 ? 0 : transformX
      cur_idx = cur_idx - 1 < 0 ? 0 : cur_idx - 1
      setCurrent(cur_idx * perCount + 1)
      setX(transformX)
      SwiperInfo.current = {...rest, transformX, cur_idx, list_i_w, list_s_w, list_len, cur_max}
      return
    }
    if (type !== 'pre' && type !== 'next' && transformX === list_s_w - list_i_w) {
      cur_idx = 0
      setCurrent(cur_idx * perCount + 1)
      setX(0)
      SwiperInfo.current = {...rest, transformX:0, cur_idx, list_i_w, list_s_w, list_len, cur_max}
      return
    }
    transformX -= list_s_w
    transformX = transformX < list_s_w - list_i_w ? list_s_w - list_i_w : transformX
    cur_idx = cur_idx + 1 > cur_max ? cur_max : cur_idx + 1
    setCurrent(cur_idx * perCount + 1 > list_len - 1 ? list_len - 1 : cur_idx * perCount + 1)
    setX(transformX)
    SwiperInfo.current = {...rest, transformX, cur_idx, list_i_w, list_s_w, list_len, cur_max}
  }

  const autoRunFn = () => {
    if (SwiperInfo.current?.autoRun) {
      window.clearTimeout(SwiperInfo.current.time_out_timer)
      SwiperInfo.current.time_out_timer = window.setTimeout(() => {
        checkHandle()
        autoRunFn()
      }, 3000)
    }
  }
  const autoRunHandle = () => {
    if (SwiperInfo.current) {
      SwiperInfo.current.autoRun = true
      autoRunFn()
    }
  }
  const stopRunHandle = () => {
    if (SwiperInfo.current) {
      window.clearTimeout(SwiperInfo.current.time_out_timer)
      SwiperInfo.current.autoRun = false
    }
  }

  const preHandle = () => {
    stopRunHandle()
    checkHandle('pre')
    window.clearTimeout(SwiperInfo.current.time_out_timer)
    SwiperInfo.current.time_out_timer = window.setTimeout(() => {
      autoRunHandle()
    }, 2000)
    // updateDomInfo()
    // const instance = Signleton.getInstance()
    // let { list_i_w, list_s_w, list_len, transformX, cur_idx, ...rest } = instance.getData("swiperData")
    // let { list_i_w, list_s_w, list_len, transformX, cur_idx, ...rest } = SwiperInfo.current
    // if (list_i_w <= 0 || list_s_w <= 0 || (list && list.length <= perCount) || list_len <= 0) {
    //   return
    // }
    // transformX += list_s_w
    // transformX = transformX > 0 ? 0 : transformX
    // cur_idx = cur_idx - 1 < 0 ? 0 : cur_idx - 1
    // setCurrent(cur_idx * perCount + 1)
    // setX(transformX)
    // // instance.updateData("swiperData", {...rest, transformX, cur_idx, list_i_w, list_s_w, list_len, })
    // SwiperInfo.current = {...rest, transformX, cur_idx, list_i_w, list_s_w, list_len }
  }
  const nextHandle = () => {
    stopRunHandle()
    checkHandle('next')
    window.clearTimeout(SwiperInfo.current.time_out_timer)
    SwiperInfo.current.time_out_timer = window.setTimeout(() => {
      autoRunHandle()
    }, 2000)
    // updateDomInfo()
    // // const instance = Signleton.getInstance()
    // // let { list_i_w, list_s_w, list_len, transformX, cur_idx, cur_max, ...rest } = instance.getData("swiperData")
    // let { list_i_w, list_s_w, list_len, transformX, cur_idx, cur_max, ...rest } = SwiperInfo.current
    // if (list_i_w <= 0 || list_s_w <= 0 || (list && list.length <= perCount) || list_len <= 0) {
    //   return
    // }
    // // console.log(`${list.length}:${perCount}`)
    // transformX -= list_s_w
    // transformX = transformX < list_s_w - list_i_w ? list_s_w - list_i_w : transformX
    // cur_idx = cur_idx + 1 > cur_max ? cur_max : cur_idx + 1
    // setCurrent(cur_idx * perCount + 1 > list_len - 1 ? list_len - 1 : cur_idx * perCount + 1)
    // setX(transformX)
    // // instance.updateData("swiperData", {...rest, transformX, cur_idx, list_i_w, list_s_w, list_len, cur_max})
    // SwiperInfo.current = {...rest, transformX, cur_idx, list_i_w, list_s_w, list_len, cur_max}
  }

  useEffect(() => {
    // setList([
    //   { id: '1', name: '奖品1', img: '', num: 10 },
    //   { id: '2', name: '奖品2', img: '', num: 9 },
    //   { id: '3', name: '奖品3', img: '', num: 8 },
    //   { id: '4', name: '奖品4', img: '', num: 7 },
    //   { id: '5', name: '奖品5', img: '', num: 6 },
    //   { id: '6', name: '奖品6', img: '', num: 5 },
    //   { id: '7', name: '奖品7', img: '', num: 4 },
    //   { id: '8', name: '奖品8', img: '', num: 3 },
    //   { id: '9', name: '奖品9', img: '', num: 2 },
    // ])
    // Signleton.getInstance("swiperData", {
    //   list_s_w: 0,
    //   list_i_w: 0,
    //   transformX: 0,
    //   cur_idx: 0,
    //   cur_max: 0,
    //   list_len: 0
    // })
    console.log('list', list)
    SwiperInfo.current = {
      list_s_w: 0,
      list_i_w: 0,
      transformX: 0,
      cur_idx: 0,
      cur_max: 0,
      list_len: 0,
      time_out_timer: null,
      aFrameTime: 0,
      autoRun: false
    }
    if (list.length > 0) {
      setCurrent(1)
      let cur_max = Math.floor(list.length / perCount) + (list.length % perCount > 0 ? 1 : 0) - 1
      SwiperInfo.current = {
        ...SwiperInfo.current,
        cur_max: cur_max,
        list_len: list.length,
        autoRun: true
      }
      setTimeout(() => {
        updateDomInfo(true)
        autoRunHandle()
      }, 0)
    }
    // else {
    //   Signleton.getInstance().updateData("swiperData", {
    //     list_s_w: 0,
    //     list_i_w: 0,
    //     transformX: 0,
    //     cur_idx: 0,
    //     cur_max: 0,
    //     list_len: 0
    //   })
    // }
  }, [list])

  const clickItemHandle = (idx) => {
    setCurrent(idx)
  }
  return (
    <div className="prize-show">
      {
        showImg
        ? (
          <div className="prize-box">
            <div className="img"><img src={list[current] && list[current].img} /></div>
            <div>{list[current] && list[current].name} * {list[current] && list[current].num}</div>
          </div>
        )
        : null
      }
      <div className="list-wrap">
        <div className='pre' onClick={preHandle}></div>
        <div className="list-inner" ref={listDom}>
          <div className="list" ref={listInner} style={{"transform": `translateX(${distX}px)`, "width": `${itemW * list.length}px`}}>
            {
              list.length > 0
              ? (
                list.map((item, index) => {
                  return (
                    <div className={classNames('item', current === index && showImg ? 'active' : '')} key={index} style={{width: `${itemW}px`}} onClick={() => { clickItemHandle(index) }}>
                      <div className="img"><img src={item.img} /></div>
                      <div className="name">{item.name}x{item.num}</div>
                    </div>
                  )
                })
              )
              : ''
            }
          </div>
        </div>
        <div className='next' onClick={nextHandle}></div>
      </div>
    </div>
  )
}

export default Swiper;
