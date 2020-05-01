import React, { useState, useEffect } from 'react'
import { IonCardContent, IonItem, IonLabel, IonDatetime, IonIcon, IonCheckbox, IonItemDivider, IonToggle } from '@ionic/react'
import { addCircleOutline } from 'ionicons/icons'
import { useDispatch } from 'react-redux'
import { setJadwal } from '../redux/actions'
import $ from 'jquery'

interface OwnProps {
  hariID: string
}

const styleShown = {
  display: 'block'
}

const none = {
  display: 'none'
}

const height1px = {
  minHeight: '1px'
}

const TimePickerDay: React.FC<OwnProps> = ({ hariID }) => {
  const [jamBuka, setJamBuka] = useState('2020-01-01T07:30')
  const [jamTutup, setJamTutup] = useState('2020-01-01T15:00')
  const [sameAsSenin, setSameAsSenin] = useState(false)
  const [isLibur, setIsLibur] = useState(false)
  const [sumOfIstirahat, setSumOfIstirahat] = useState(0)
  const [istirahat, setIstirahat] = useState(false)
  const [jamMulaiIstirahat, setJamMulaiIstirahat] = useState('2020-01-01T12:00')
  const [jamSelesaiIstirahat, setJamSelesaiIstirahat] = useState('2020-01-01T13:00')
  const dispatch = useDispatch()

  function toggleSameAsSenin() {
    setSameAsSenin(!sameAsSenin)
  }

  function toggleLibur() {
    setIsLibur(!isLibur)
  }

  function addIstirahat() {
    setIstirahat(true)
  }

  useEffect(() => {
    var jadwalString
    if (isLibur) {
      jadwalString = ""
    } else if (sameAsSenin) {
      jadwalString = "s"
    } else {
      jadwalString = jamBuka.split("T")[1].substring(0, 5)
      if (istirahat) {
        jadwalString += "-" + jamMulaiIstirahat.split("T")[1].substring(0, 5)
        jadwalString += "," + jamSelesaiIstirahat.split("T")[1].substring(0, 5)
      }
      jadwalString += "-" + jamTutup.split("T")[1].substring(0, 5)
      var params = {
        hari: hariID,
        jadwal: jadwalString
      }
      //dispatch(setJadwal(params))
    }
    $('#jadwal-hari-' + hariID).val(jadwalString)
  })

  return (
    <IonCardContent className="item-hari" id={"item" + hariID} style={hariID === "0" ? styleShown : none}>
      <input type="hidden" id={"jadwal-hari-" + hariID}></input>
      {hariID === "0" ? "" :
        <IonItem lines="none">
          <IonLabel><p>Sama seperti Senin</p></IonLabel>
          <IonToggle onClick={() => toggleSameAsSenin()}></IonToggle>
        </IonItem>
      }
      {sameAsSenin ? "" : <IonItem lines="none">
        <IonLabel><p>Libur</p></IonLabel>
        <IonToggle onClick={() => toggleLibur()}></IonToggle>
      </IonItem>
      }
      <IonItemDivider style={height1px}></IonItemDivider>
      {sameAsSenin ? "" : isLibur ? "" :
        <>
          <IonItem lines="none">
            <IonLabel>Buka</IonLabel>
            <IonDatetime value={jamBuka} displayFormat="HH:mm" onIonChange={(e: any) => setJamBuka(e.target.value)}></IonDatetime>
          </IonItem>
          {!istirahat ?
            <IonItem lines="none" mode="md" button onClick={() => addIstirahat()}>
              <IonIcon icon={addCircleOutline} />
              <IonLabel><p>Tambah waktu istirahat...</p></IonLabel>
            </IonItem>
            :
            <>
              <IonItem lines="none">
                <IonLabel>Mulai Istirahat</IonLabel>
                <IonDatetime value={jamMulaiIstirahat} displayFormat="HH:mm" onIonChange={(e: any) => setJamMulaiIstirahat(e.target.value)}></IonDatetime>
              </IonItem>
              <IonItem lines="none">
                <IonLabel>Selesai Istirahat</IonLabel>
                <IonDatetime value={jamSelesaiIstirahat} displayFormat="HH:mm" onIonChange={(e: any) => setJamSelesaiIstirahat(e.target.value)}></IonDatetime>
              </IonItem>
            </>
          }
          <IonItem lines="none">
            <IonLabel>Tutup</IonLabel>
            <IonDatetime value={jamTutup} displayFormat="HH:mm" onIonChange={(e: any) => setJamTutup(e.target.value)}></IonDatetime>
          </IonItem>
        </>
      }
    </IonCardContent>
  )
}

export default TimePickerDay