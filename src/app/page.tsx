'use client'
import { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
} from '@mui/material'

export default function Page() {
  const [topics, setTopics] = useState<string[]>([])
  const [availableDiffs, setAvailableDiffs] = useState<number[]>([])
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [difficulties, setDifficulties] = useState<number[]>([])
  const [points, setPoints] = useState(20)
  const [strategy, setStrategies] = useState('random')
  const [color, setColor] = useState('lightblue')
  const [secColor, setSecColor] = useState('blue')

  const strategies = [{
    id: "random",
    name: "Random exercises"
  },{
    id: "difficulty",
    name: "Every difficulty is represented equally"
  },{
    id: "topic",
    name: "Every topic is represented equally"
  },{
    id: "points",
    name: "50% low point exercises, 50% higher point exercises"
  }];

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

  const handleTopicChange = (event: any) => {
    const value = event.target.value as string[]
    if (value.includes('all')) {
      setSelectedTopics(selectedTopics.length === topics.length ? [] : topics)
    } else {
      setSelectedTopics(value)
    }
  }
  
  const handleDifficultyChange = (event: any) => {
    const value = event.target.value as string[]
    if (value.includes('all')) {
      setDifficulties(
        difficulties.length === availableDiffs.length ? [] : availableDiffs
      )
    } else {
      setDifficulties(value.map((v) => parseInt(v, 10)))
    }
  }
  
  async function generate() {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topics: selectedTopics,
        difficulties,
        points,
        strategy
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
    <Box p={4} display="flex" flexDirection="column" gap={3}>
      <Typography variant="h5" component="h2">
        Generate mock exams
      </Typography>
      <FormControl fullWidth>
        <InputLabel 
          id="topic-label"
          sx={{
            color: color, 
            "&.Mui-focused": {
              color: secColor, 
            },
          }}
        >
          Topics
        </InputLabel>
        <Select
          labelId="topics-label"
          multiple
          value={selectedTopics}
          label="Topics"
          onChange={handleTopicChange}
          renderValue={(selected) => (selected as string[]).join(', ')}
          sx={{
            color: "white",               
            backgroundColor: "#333",      
            "& .MuiSvgIcon-root": {
              color: color,             
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: color,      
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "lightgray",   
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: secColor,       
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: color,  
                color: "black",          
              },
            },
          }}
        >
          <MenuItem value="all">
            <Checkbox checked={selectedTopics.length === topics.length} />
            <ListItemText primary="All" />
          </MenuItem>
          {topics.map((t) => (
            <MenuItem key={t} value={t}>
              <Checkbox checked={selectedTopics.indexOf(t) > -1} />
              <ListItemText primary={t} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel 
          id="diff-label"
          sx={{
            color: color, 
            "&.Mui-focused": {
              color: secColor, 
            },
          }}
        >
          Difficulties
        </InputLabel>
        <Select
          labelId="diff-label"
          multiple
          value={difficulties.map((d) => d.toString())}
          label="Difficulties"
          onChange={handleDifficultyChange}
          renderValue={(selected) => (selected as string[]).join(', ')}
          sx={{
            color: "white",               
            backgroundColor: "#333",      
            "& .MuiSvgIcon-root": {
              color: color,             
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: color,      
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "lightgray",   
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: secColor,       
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: color,  
                color: "black",          
              },
            },
          }}
        >
          <MenuItem value="all">
            <Checkbox checked={difficulties.length === availableDiffs.length} />
            <ListItemText primary="All" />
          </MenuItem>
          {availableDiffs.map((d) => (
            <MenuItem key={d} value={d.toString()}>
              <Checkbox checked={difficulties.indexOf(d) > -1} />
              <ListItemText primary={d.toString()} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Max. points"
        type="number"
        value={points}
        onChange={(e) => setPoints(parseInt(e.target.value, 10))}
        InputLabelProps={{ shrink: true }}
        sx={{
          input: { color: "white" },
          "& .MuiInputLabel-root": {
            color: color,
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: secColor,
          },
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#333",
            "& fieldset": {
              borderColor: color,
            },
            "&:hover fieldset": {
              borderColor: "lightgray",
            },
            "&.Mui-focused fieldset": {
              borderColor: secColor,
            },
          },
        }}
      />
      <FormControl fullWidth>
        <InputLabel
          id="strategy-label"
          sx={{
            color: color,
            "&.Mui-focused": {
              color: secColor,
            },
          }}
        >
          Strategy
        </InputLabel>
        <Select
          labelId="strategy-label"
          value={strategy}
          label="Strategy"
          onChange={(e) => setStrategies(e.target.value as string)}
          sx={{
            color: "white",
            backgroundColor: "#333",
            "& .MuiSvgIcon-root": {
              color: color,
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: color,
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "lightgray",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: secColor,
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: color, 
                color: "black",         
              },
            },
          }}
        >
          {strategies.map((s) => (
            <MenuItem key={s.id} value={s.id}>
              {s.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <br></br>
      <Button variant="contained" onClick={generate}>
        Generate
      </Button>
    </Box>
  )
}
