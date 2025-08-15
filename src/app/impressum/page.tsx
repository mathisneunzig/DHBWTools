export default function Impressum() {
  return (
    <div
        style={{
        fontFamily: 'Arial',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',       
        textAlign: 'center',
        minHeight: '100vh',            
        width: '100vw',                
        boxSizing: 'border-box',
        padding: '2rem',
        }}
    >
      <h1>Impressum</h1>
      <p>
        Diese Webseite ist ein privates Projekt zur Anzeige der
        Smart-Toiletten-Daten von Tommy, der Katze.
      </p>
      <p>Verantwortlich: Mathis Neunzig</p>
      <p>Europaplatz 17 69115 Heidelberg</p>
      <p>info@mathis-neunzig.de</p>
    </div>
  )
}
