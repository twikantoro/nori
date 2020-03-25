export function toast(message: string, duration = 6000) {
  const toast = document.createElement('ion-toast')
  toast.message = message
  toast.duration = duration
  toast.buttons = [
    {
      side: 'end',
      icon: 'star',
      text: 'OK',
    }
  ]
  document.body.appendChild(toast)
  return toast.present()
}