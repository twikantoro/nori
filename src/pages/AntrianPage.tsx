import React from "react"
import { IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react"
import CardAntrian from "../components/CardAntrian"
import { useSelector, connect } from "react-redux"

const DefaultAntrianPage: React.FC = () => {
  const antrians = useSelector((state: any) => state.antrians)
  //console.log(antrians)

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Antrian
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {antrians.map(function (curr: any) {
          return (
            <CardAntrian
              key={curr.id}
              gerai={curr.gerai}
              subLayanan={curr.subLayanan}
              prefix={curr.prefix}
              slot={curr.slot}
              current={curr.current}
              tanggal="12 April 2020"
              waktu={curr.perkiraan}
              status={curr.status}
            />
          )
        })}
      </IonContent>
    </>
  )
}

export default connect()(DefaultAntrianPage)