import { IonAlert, IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonList, IonLoading, IonRow, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar } from '@ionic/react'
import $ from 'jquery'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from '../components/toast'
import { getToken } from '../config/firebaseConfig'
import kotKabs from '../json/kota-kabupaten'
import { editGeraiAsync, hapusGeraiAsync } from '../redux/actions'

const GeraiEditPage: React.FC = () => {
  const [busy, setBusy] = useState(false)
  const state = useSelector((state: any) => state)

  const pemilik = useSelector((state: any) => state.pemilik)
  const dispatch = useDispatch()
  const geraiNeedsUpdateLocal = useSelector((state: any) => state.geraiNeedsUpdate)
  const gerais = state.pemilik.gerais

  const pemilikBelongingsUpToDateLocal = state.pemilikBelongingsUpToDate

  const geraiKode = window.location.href.split("/")[5]

  var id_gerai = ''
  var currGerai = { nama: '', deskripsi: '', alamat: '', kode: '', wilayah: '', tautan: '' }
  for (const gerai of gerais) {
    if (gerai.kode === geraiKode) {
      id_gerai = gerai.id
      currGerai = gerai
    }
  }

  const [nama, setNama] = useState(currGerai.nama)
  const [deskripsi, setDeskripsi] = useState(currGerai.deskripsi)
  const [alamat, setAlamat] = useState(currGerai.alamat)
  const [wilayah, setWilayah] = useState(currGerai.wilayah)
  const [kode, setKode] = useState(currGerai.kode)
  const [tautan, setTautan] = useState(currGerai.tautan)

  const [showAlertDelete, setShowAlertDelete] = useState(false)

  async function submitEditGerai() {
    if (nama === '' || kode === '' || deskripsi === '' || alamat === '' || wilayah === '') {
      toast("Mohon isi formulir secara lengkap")
      return false
    }
    setBusy(true)
    const params = {
      token: await getToken(),
      id_pemilik: pemilik.id,
      nama: nama,
      kode: kode,
      deskripsi: deskripsi,
      alamat: alamat,
      wilayah: wilayah,
      id_gerai: id_gerai,
      tautan: tautan
    }
    dispatch(editGeraiAsync(params))
  }

  useEffect(() => {
    if (!pemilikBelongingsUpToDateLocal) {
      setBusy(false)
      toast("Berhasil")
      //$('#btnToGerai').click()
      window.location.href = "/pemilik/gerai"
    }
  })

  async function hapusGerai() {
    setBusy(true)
    const params = {
      token: await getToken(),
      id_pemilik: pemilik.id,
      kode: kode
    }
    dispatch(hapusGeraiAsync(params))
  }

  function hapusGeraiConfirm() {
    if ($("#konfirmasi-hapus").val() === kode) {
      hapusGerai()
    } else {
      toast("Konfirmasi gagal. Batal dihapus")
    }
  }

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/pemilik/gerai"></IonBackButton>
          </IonButtons>
          <IonTitle>
            Edit Gerai
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton id="btnToGerai" className="custom-hidden" routerLink="/pemilik/gerai" />
        <IonLoading isOpen={busy} />
        <IonGrid>
          <IonList>
            <IonItem>
              <b>Nama:</b>&nbsp;
              <IonInput
                type="text"
                placeholder="Rumah Sakit Meikarta"
                onIonChange={(e: any) => setNama(e.target.value)}
                required
                value={nama}
              />
            </IonItem>
            <IonItem>
              <b>Kode:</b>&nbsp;
              <IonInput
                type="text"
                placeholder="rsmeikarta"
                onIonChange={(e: any) => setKode(e.target.value)}
                required
                value={kode}
              />
            </IonItem>
            <IonItem lines="none">
              <b>Deskripsi:</b>&nbsp;
            </IonItem>
            <IonItem>
              <IonTextarea
                onIonChange={(e: any) => setDeskripsi(e.target.value)}
                placeholder="Tersedia Poliklinik dan layanan lainnya"
                value={deskripsi}
              ></IonTextarea>
            </IonItem>
            <IonItem lines="none">
              <b>Alamat:</b>&nbsp;
            </IonItem>
            <IonItem>
              <IonTextarea
                onIonChange={(e: any) => setAlamat(e.target.value)}
                placeholder="Jl. Kenangan No. 420, Meikarta"
                value={alamat}
              ></IonTextarea>
            </IonItem>
            <IonItem>
              <b>Wilayah:</b>&nbsp;
              <IonSelect slot="end" value={wilayah} interface="alert" onIonChange={(e) => setWilayah(e.detail.value)}>
                {kotKabs.map(kotKab => {
                  return (
                    <IonSelectOption key={kotKab} value={kotKab}>{kotKab}</IonSelectOption>
                  )
                })}
              </IonSelect>
            </IonItem>
            <IonItem>
              <b>Tautan lokasi (opsional):</b>&nbsp;
              <IonInput
                type="text"
                placeholder="https://goo.gl/maps/yTzNq95m7WKJQgCp7"
                onIonChange={(e: any) => setTautan(e.target.value)}
                required
                value={tautan}
              />
            </IonItem>
            {/* <IonItem>
              <b>Lokasi:</b>&nbsp;
              <iframe
                src="https://www.google.com/maps/embed/v1/search?key=AIzaSyB5Z9FXmzH-_Z15QDYNg6boA28ak3tRbPE&q=record+stores+in+Seattle">
              </iframe>
            </IonItem> */}
          </IonList>
          <IonRow>
            <IonCol>
              <IonButton
                type="submit"
                expand="block"
                onClick={() => submitEditGerai()}
              >Submit
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton color="danger" fill="outline" expand="block" onClick={() => setShowAlertDelete(true)}>
                Hapus gerai
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonAlert
          isOpen={showAlertDelete}
          onDidDismiss={() => setShowAlertDelete(false)}
          header={'Hapus gerai?'}
          message={'Mohon ketik <b>' + kode + '</b> untuk mengonfirmasi'}
          buttons={[
            {
              text: 'Batal',
              role: 'cancel',
              handler: blah => {
                //console.log('Confirm Cancel: blah');
              }
            },
            {
              text: 'Hapus',
              handler: () => {
                hapusGeraiConfirm()
              }
            }
          ]}
          inputs={
            [{
              id: 'konfirmasi-hapus',
              type: 'text',
              placeholder: 'Kode gerai'
            }]
          }
        />
      </IonContent>
    </>
  )
}

export default GeraiEditPage