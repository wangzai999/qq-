
export default ({
    EMPTY(state) {
        state.musiclist = []
    },
    GET_MUSIC(state, data) {
        state.musiclist.push(data)
    },
    GET_MUSICDAYS(state, data) {
        state.musicdays = data
    },
    PLAY_MUSIC(state, data) {
        state.playmusic = data
        setTimeout(() => {
            state.music.play()
            state.play_no = false
        }, 500)
    },
    PLAY_LRC(state, data) {
        var lrc = data.lrcContent
        if (data.lrcContent) {
            lrc = lrc.split('[')
            for (var i = 0; i < lrc.length; i++) {
                lrc[i] = lrc[i].split(']')
                lrc[i][0] = parseInt(lrc[i][0].replace(/[:.]/g, ''))
                if (lrc[i][1]) {
                    lrc[i][1] = lrc[i][1].replace(/[\r\n]/g, '')
                }
            }
            data.lrcContent = lrc
            state.playlrc = data
        }
    },
    ADD_PLAYLIST(state, item) {
        var have = false
        for (var i = 0; i < state.playlist.length; i++) {
            if (state.playlist[i].song_id === item.song_id) {
                state.playid = i
                have = true
                break
            }
        }
        if (!have) {
            state.playlist.push(item)
            state.playid = state.playlist.length - 1
        }
    },
    START_SEEK(state, data) {
        state.seekmusiclist = data.song
    },
    START_SEEKS(state, data) {
        state.allseek = data
    },
    GET_SINGER(state, data) {
        state.singer = data
    },
    GET_SINGERMUSIC(state, data) {
        state.singermusic = data
    },
    GET_USER(state,data) {
        state.user = data
    },
    GET_USERLIST(state,data) {
        state.userlist = data
    },
    GET_USERMUSICLIST(state,data){
        state.usermusiclist = data
    },
    SET_PLAYLIST(state,arr) {
        state.playlist = arr
    }
})