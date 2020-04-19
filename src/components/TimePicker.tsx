import React, { useState } from 'react'
import { IonItem, IonLabel, IonDatetime, IonIcon, IonChip, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonItemDivider } from '@ionic/react'
import { addCircleOutline } from 'ionicons/icons'
import $ from 'jquery'

const TimePicker: React.FC = () => {
  const [sen, setSen] = useState(true)
  const [sel, setSel] = useState(false)
  const [rab, setRab] = useState(false)
  const [kam, setKam] = useState(false)
  const [jum, setJum] = useState(false)
  const [sab, setSab] = useState(false)
  const [min, setMin] = useState(false)
  const [haris, setHaris] = useState([sen, sel, rab, kam, jum, sab, min])

  const [hariDisplay, setHariDisplay] = useState('')

  const ItemDividerStyle = {
    minHeight: "1px"
  }

  function changeHariDisplay() {
    $('#hari-display').text('')
    var i
    // check how many series
    var series = 0
    var start = undefined, end = undefined
    for (i = 1; i < 7; i++) {
      // print start
      if (haris[i - 1] && (start == undefined || end !== undefined)) {
        start = i - 1
        appendTitle('start', i - 1)
      }
      // print end
      if (!haris[i] && haris[i-1]) {
        end = i - 1
        appendTitle('end', i - 1)
      }
      // count series
      if (!haris[i] && haris[i - 1]) {
        series++
      }
    }
    //if ends none
    if(end==undefined){
      appendTitle('end', 6)
    }

    // define the days
    // var j = 0
    // for (i = 0; i < series; i++) {
    //   var start
    //   var end
    //   for (i = 0; i < 7; i++) {
    //     if (haris[i]) {
    //       start = i
    //     }
    //   }
    // }
  }

  function appendTitle(role: any, hari: number) {
    // define last character
    var display = $('#hari-display').text()
    var lastCharacter = display.substring(display.length, 1)
    // eksekusi - start
    var displayHari = getDay(hari)
    if (role == 'start' && !lastCharacter.match(/^[A-Za-z]+$/)) {
      $('#hari-display').text($('#hari-display').text() + displayHari)
    } else if (role == 'start') {
      $('#hari-display').text($('#hari-display').text() + ", " + displayHari)
    } else {
      $('#hari-display').text($('#hari-display').text() + " - " + displayHari)
    }
  }

  function getDay(hari: any) {
    switch (hari) {
      case 0:
        return "Senin"
      case 1:
        return "Selasa"
      case 2:
        return "Rabu"
      case 3:
        return "Kamis"
      case 4:
        return "Jumat"
      case 5:
        return "Sabtu"
      case 6:
        return "Minggu"
    }
  }

  function toggleHari(hari: any) {
    switch (hari) {
      case 0:
        setSen(!sen)
        break;
      case 1:
        setSel(!sel)
        break;
      case 2:
        setRab(!rab)
        break;
      case 3:
        setKam(!kam)
        break;
      case 4:
        setJum(!jum)
        break;
      case 5:
        setSab(!sab)
        break;
      case 6:
        setMin(!min)
        break;
    }
    setHaris([sen, sel, rab, kam, jum, sab, min])
    changeHariDisplay()
  }

  return (
    <>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle id="hari-display"></IonCardTitle>
          <IonCardSubtitle>07:30-11.00, 12:00-15.00</IonCardSubtitle>
        </IonCardHeader>
        <IonItemDivider style={ItemDividerStyle}></IonItemDivider>
        <IonCardContent>
          <IonItem lines="none">
            <IonLabel>Buka</IonLabel>
            <IonDatetime value="2020-01-01T07:30" displayFormat="HH:mm"></IonDatetime>
          </IonItem>
          <IonItem lines="none">
            <IonLabel>Tutup</IonLabel>
            <IonDatetime value="2020-01-01T15:30" displayFormat="HH:mm"></IonDatetime>
          </IonItem>
          <IonItem lines="none">
            <IonIcon icon={addCircleOutline} />
            <IonLabel><p>Tambah waktu istirahat...</p></IonLabel>
          </IonItem>
          <IonItem lines="none">
            <IonChip onClick={() => toggleHari(0)} color={sen ? "primary" : "light"} outline={true}>S</IonChip>
            <IonChip onClick={() => toggleHari(1)} color={sel ? "primary" : "light"} outline={true}>S</IonChip>
            <IonChip onClick={() => toggleHari(2)} color={rab ? "primary" : "light"} outline={true}>R</IonChip>
            <IonChip onClick={() => toggleHari(3)} color={kam ? "primary" : "light"} outline={true}>K</IonChip>
            <IonChip onClick={() => toggleHari(4)} color={jum ? "primary" : "light"} outline={true}>J</IonChip>
            <IonChip onClick={() => toggleHari(5)} color={sab ? "primary" : "light"} outline={true}>S</IonChip>
            <IonChip onClick={() => toggleHari(6)} color={min ? "primary" : "light"} outline={true}>M</IonChip>
          </IonItem>
        </IonCardContent>
      </IonCard>
    </>
  )
}

export default TimePicker