import React, { useEffect, useState } from 'react'

const Quiz = ({ data }: { data: string }) => {
  const [decodedHtml, setDecodedHtml] = useState('')

  useEffect(() => {
    const script = document.createElement('script')
    script.src = '//embed.typeform.com/next/embed.js'
    script.async = true
    document.body.appendChild(script)
  }, [])

  useEffect(() => {
    const decodeHtml = (html: string) => {
      const textArea = document.createElement('textarea')
      textArea.innerHTML = html
      return textArea.value
    }
    setDecodedHtml(decodeHtml(data))
  }, [data])

  return <div dangerouslySetInnerHTML={{ __html: decodedHtml }} />
}

export default Quiz
