import React, { useState, useEffect } from 'react'
import { IonItem, IonLabel, IonDatetime, IonIcon, IonChip, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonItemDivider } from '@ionic/react'
import { addCircleOutline } from 'ionicons/icons'
import $ from 'jquery'
import TimePickerDay from './TimePickerDay'

interface OwnProps {
  jadwal: any
}

const TimePicker: React.FC<OwnProps> = ({ jadwal }) => {
  var jadwalArr = new Array(0)

  if (jadwal === 'empty') {
    jadwalArr = ["e", "e", "e", "e", "e", "e", "e"]
  } else {
    jadwalArr = JSON.parse(jadwal)
    for (let i = 1; i < 7; i++) {
      if (jadwalArr[0] === jadwalArr[i]) {
        jadwalArr[i] = 's'
      }
    }
  }

  const [sen, setSen] = useState(true)
  const [sel, setSel] = useState(false)
  const [rab, setRab] = useState(false)
  const [kam, setKam] = useState(false)
  const [jum, setJum] = useState(false)
  const [sab, setSab] = useState(false)
  const [min, setMin] = useState(false)
  const [haris, setHaris] = useState([sen, sel, rab, kam, jum, sab, min])
  const [chosenHari, setChosenHari] = useState(0)
  const [pageInitiated, setPageInitiated] = useState(false)

  const [hariDisplay, setHariDisplay] = useState('')

  const styleShown = {
    display: "block"
  }

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
      if (haris[i - 1] && (start === undefined || end !== undefined)) {
        start = i - 1
        appendTitle('start', i - 1)
      }
      // print end
      if (!haris[i] && haris[i - 1]) {
        end = i - 1
        appendTitle('end', i - 1)
      }
      // count series
      if (!haris[i] && haris[i - 1]) {
        series++
      }
    }
    //if ends none
    if (end === undefined) {
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
    if (role === 'start' && !lastCharacter.match(/^[A-Za-z]+$/)) {
      $('#hari-display').text($('#hari-display').text() + displayHari)
    } else if (role === 'start') {
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

  function chooseHari(hari: any) {
    $(".item-hari").hide()
    $('#item' + hari).show()
    setChosenHari(hari)
  }

  if (pageInitiated) {
    chooseHari(0)
    setPageInitiated(true)
  }

  return (
    <>
      <IonCard>
        <IonCardHeader>
          <IonItem lines="none">
            <IonChip onClick={() => chooseHari(0)} color={chosenHari === 0 ? "" : "light"}>S</IonChip>
            <IonChip onClick={() => chooseHari(1)} color={chosenHari === 1 ? "" : "light"}>S</IonChip>
            <IonChip onClick={() => chooseHari(2)} color={chosenHari === 2 ? "" : "light"}>R</IonChip>
            <IonChip onClick={() => chooseHari(3)} color={chosenHari === 3 ? "" : "light"}>K</IonChip>
            <IonChip onClick={() => chooseHari(4)} color={chosenHari === 4 ? "" : "light"}>J</IonChip>
            <IonChip onClick={() => chooseHari(5)} color={chosenHari === 5 ? "" : "light"}>S</IonChip>
            <IonChip onClick={() => chooseHari(6)} color={chosenHari === 6 ? "" : "light"}>M</IonChip>
          </IonItem>
        </IonCardHeader>
        <IonItemDivider style={ItemDividerStyle}></IonItemDivider>
        <TimePickerDay hariID="0" jadwalDay={jadwalArr[0]} />
        <TimePickerDay hariID="1" jadwalDay={jadwalArr[1]} />
        <TimePickerDay hariID="2" jadwalDay={jadwalArr[2]} />
        <TimePickerDay hariID="3" jadwalDay={jadwalArr[3]} />
        <TimePickerDay hariID="4" jadwalDay={jadwalArr[4]} />
        <TimePickerDay hariID="5" jadwalDay={jadwalArr[5]} />
        <TimePickerDay hariID="6" jadwalDay={jadwalArr[6]} />
      </IonCard>
    </>
  )
}

export default TimePicker