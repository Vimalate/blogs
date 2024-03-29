---
title: webrtc初探
date: 2020-06-21 00:26:25
tags:
 - 技巧
categories: 
 - 其他
---

## WebRtc 源码目录结构

![](./img/webrtc-mulu.png)

## 唤起录音

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<audio id="recordedAudio" src=""></audio>

<body>
  <script>
    async function startRecording () {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

        const mediaRecorder = new MediaRecorder(stream)
        const chunks = []

        mediaRecorder.addEventListener("dataavailable", (event) => {
          chunks.push(event.data)
        })

        mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(chunks, { type: "audio/wav" })
          const audioUrl = URL.createObjectURL(audioBlob)

          // 获取 audio 标签，并设置 src 属性
          const audioElement = document.getElementById("recordedAudio")
          audioElement.src = audioUrl

          // 播放录音
          audioElement.play()
        })

        mediaRecorder.start()
        console.log("开始录音")

        setTimeout(() => {
          mediaRecorder.stop()
          console.log("结束录音")
        }, 5000) // 录音时长为 5 秒
      } catch (err) {
        console.error("无法访问麦克风：" + err)
      }
    }
    startRecording()
  </script>
</body>

</html>
```