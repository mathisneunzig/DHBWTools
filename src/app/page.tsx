'use client'
import { useEffect, useState } from 'react'

export default function Page() {
  const [topics, setTopics] = useState<string[]>([])
  const [availableDiffs, setAvailableDiffs] = useState<number[]>([])
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [difficulties, setDifficulties] = useState<number[]>([])
  const [points, setPoints] = useState(10)

  useEffect(() => {
    async function load(): Promise<void> {
      const res = await fetch('/api/topics')
      const data = await res.json() as { topics: string[]; difficulties: number[] }
      setTopics(data.topics)
      setAvailableDiffs(data.difficulties)
      setDifficulties(data.difficulties)
    }
    void load()
  }, [])

  const toggleTopic = (name: string) => {
    setSelectedTopics((prev) =>
      prev.includes(name) ? prev.filter((t) => t !== name) : [...prev, name]
    )
  }

  const toggleDifficulty = (d: number) => {
    setDifficulties((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    )
  };
  
  async function generate() {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topics: selectedTopics,
        difficulties,
        points,
        exam: false,
      }),
    })
  
    const data = await res.json() as {
      title: string
      css: string
      body: string
    }
  
    const { title, css, body } = data
  
    const fullHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>${title}</title>
          <style>${css}</style>
        </head>
        <body>
          ${body}
  
          <!-- html2pdf.js von CDN -->
          <script src="https://unpkg.com/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js"></script>
  
          <!-- Autostart -->
          <script>
            window.onload = function () {
              html2pdf()
                .set({
                  margin: 10,
                  filename: 'klausur.pdf',
                  image: { type: 'jpeg', quality: 0.98 },
                  html2canvas: { scale: 2 },
                  jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
                })
                .from(document.body)
                .save()
                .then(() => window.close())
            }
          </script>
        </body>
      </html>
    `
  
    const popup = window.open('', '_blank')
    if (!popup) {
      alert('Popup blocked!')
      return
    }
  
    popup.document.open()
    popup.document.write(fullHtml)
    popup.document.close()
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      <h1 className="text-xl font-bold">Generate mock exams</h1>
      <div>
        <h2>Topics</h2>
        <div className="flex gap-2 flex-wrap">
          {topics.map((t) => (
            <label key={t} className="flex gap-1 items-center">
              <input
                type="checkbox"
                checked={selectedTopics.includes(t)}
                onChange={() => toggleTopic(t)}
              />
              {t}
            </label>
          ))}
        </div>
      </div>
      <div>
        <h2>Difficulties</h2>
        <div className="flex gap-2 flex-wrap">
          {availableDiffs.map((d) => (
            <label key={d} className="flex gap-1 items-center">
              <input
                type="checkbox"
                checked={difficulties.includes(d)}
                onChange={() => toggleDifficulty(d)}
              />
              {d}
            </label>
          ))}
        </div>
      </div>
      <div>
        <label>Max. points </label>
        <input
          type="number"
          value={points}
          onChange={(e) => setPoints(parseInt(e.target.value, 10))}
          className="border p-1 w-20"
        />
      </div>
      <button className="bg-green-600 text-white p-2" onClick={generate}>
        Generate
      </button>
    </div>
  )
}
