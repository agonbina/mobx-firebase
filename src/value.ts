import firebase from 'firebase'
import BaseValue from './base'

class FirebaseValue<T> extends BaseValue<T> {

  constructor (private ref: firebase.database.Reference) {
    super()
  }

  private onValue = (snap: firebase.database.DataSnapshot) => {
    let value
    if (snap) {
      value = snap.val()
    }
    this.setCurrent(value)
  }

  onObserve () {
    this.ref.on('value', this.onValue, error => this.setError(error))
  }

  onUnobserve () {
    this.ref.off('value', this.onValue)
  }

}

export default FirebaseValue
