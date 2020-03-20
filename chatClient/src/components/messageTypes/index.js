import messageVideo from './video'
import messageArtBoard from './artBoard'
import messageAudio from './audio'
import messageFile from './file'
import messageSys from './sys'
import messageText from './text'
import messageImg from './img'

export default {
  messageVideo,
  messageArtBoard,
  messageAudio,
  messageFile,
  messageSys,
  messageText,
  messageImg
}

export const mixins = {
  props: {
    message: {
      type: Object
    }
  }
}
