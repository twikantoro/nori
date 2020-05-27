import React, { useState, useEffect } from 'react'
import { IonCardContent, IonItem, IonLabel, IonDatetime, IonIcon, IonCheckbox, IonItemDivider, IonToggle } from '@ionic/react'
import { addCircleOutline, trashBinOutline, trashOutline } from 'ionicons/icons'
import { useDispatch } from 'react-redux'
import { setJadwal } from '../redux/actions'
import $ from 'jquery'

interface OwnProps {
  hariID: string,
  jadwalDay: any
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

const TimePickerDay: React.FC<OwnProps> = ({ hariID, jadwalDay }) => {
  const [jamBuka, setJamBuka] = useState('2020-01-01T07:30')
  const [jamTutup, setJamTutup] = useState('2020-01-01T15:00')
  const [sameAsSenin, setSameAsSenin] = useState(false)
  const [isLibur, setIsLibur] = useState(false)
  const [sumOfIstirahat, setSumOfIstirahat] = useState(0)
  const [istirahat, setIstirahat] = useState(false)
  const [jamMulaiIstirahat, setJamMulaiIstirahat] = useState('2020-01-01T12:00')
  const [jamSelesaiIstirahat, setJamSelesaiIstirahat] = useState('2020-01-01T13:00')
  const dispatch = useDispatch()
  const [initialized, setInitialized] = useState(false)

  function toggleSameAsSenin() {
    console.log("sameAsSenin? " + sameAsSenin)
    setSameAsSenin(sameAsSenin ? false : true)
  }

  function toggleLibur() {
    setIsLibur(!isLibur)
  }

  function addIstirahat() {
    setIstirahat(true)
  }

  useEffect(() => {
    if (!initialized) {
      //new. trying to decode from db
      if (jadwalDay !== 'e') { //inputted, not empty
        if (jadwalDay == 's') { //same as senin
          setSameAsSenin(true)
        } else { //not same as senin
          if (jadwalDay == '') { //libur
            setIsLibur(true)
          } else { //masuk
            if (jadwalDay.includes(",")) {
              //with istirahat
              var sesi1 = jadwalDay.split(",")[0]
              setJamBuka('2020-01-01T' + sesi1.split("-")[0])
              setJamMulaiIstirahat('2020-01-01T' + sesi1.split("-")[1])
              var sesi2 = jadwalDay.split(",")[1]
              setJamSelesaiIstirahat('2020-01-01T' + sesi2.split("-")[0])
              setJamTutup('2020-01-01T' + sesi2.split("-")[1])
              setIstirahat(true)
            } else {
              //without istirahat
              setJamBuka('2020-01-01T' + jadwalDay.split("-")[0])
              setJamTutup('2020-01-01T' + jadwalDay.split("-")[1])
            }
          }
        }
      }
      setInitialized(true)
    }
    //old
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
          <IonToggle onClick={() => toggleSameAsSenin()} checked={sameAsSenin}></IonToggle>
        </IonItem>
      }
      {sameAsSenin ? "" : <IonItem lines="none">
        <IonLabel><p>Libur</p></IonLabel>
        <IonToggle onClick={() => toggleLibur()} checked={isLibur}></IonToggle>
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
          {istirahat ?
            <IonItem lines="none" mode="md" button onClick={() => setIstirahat(false)}>
              <IonIcon icon={trashOutline} color="danger" />&nbsp;
              <IonLabel><p color="danger">Hapus istirahat...</p></IonLabel>
            </IonItem> : ""}
        </>
      }
    </IonCardContent>
  )
}

export default TimePickerDay