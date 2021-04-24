import dayjs from 'dayjs'
import dayjszh from 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
import _store from '@/store'
import request from '@/utils/request'
import apis from '@/utils/apis'
dayjs.extend(relativeTime)
dayjs.locale(dayjszh)

console.log(_store, 'store')
/**
 * 时间格式转换
 */
export const FormatTime = (time = '', formatString = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(time).format(formatString)
}

/**
 * 统计记录参数
 */
export const SetRecordParameter = (obj = {
  page: '',
  content_type: '',
  content_id: ''
}) => {
  _store.commit('Record/setRecord', obj)
  createBrowseLog(_store.state.Record.record)
}

/**
 * 统计记录id修改
 */
export const SetBrowseID = (id = '') => {
  _store.commit('Record/setBrowseID', id)
}

/**
 * 统计分享记录
 */
export const SetRecordScene = (obj = {
  page: '',
  content_type: '',
  content_id: ''
}) => {
  createBrowseLog(obj, 'scene')
}

const createBrowseLog = async (obj, type = '') => {
  if (wx.getStorageSync('loginSession')) {
    if (obj.page && obj.content_type) {
      let args = {
        url: apis.getApi('createBrowseLog'),
        data: obj
      }
      let res = await request.loginHttpPost(args)
      if (type !== 'scene') {
        _store.commit('Record/setBrowseID', res.data.browse_id)
      }
    }
  }
}
