import firebase from 'firebase'
import BaseValue from './base'

type Snapshot = firebase.database.DataSnapshot

function createRecord (snapshot: Snapshot) {
  var value = snapshot.val()
  value['.key'] = snapshot.key
  return value
}

function indexForKey (array: Array<any>, key: string) {
  for (var i = 0; i < array.length; i++) {
    if (array[i]['.key'] === key) {
      return i
    }
  }
  return -1
}

class FirebaseList<T> extends BaseValue<Array<T>> {

  constructor (private ref: firebase.database.Reference) {
    super()
  }

  onAdd = (snapshot, prevKey) => {
    const list = this.getCurrent()
    const index = prevKey ? indexForKey(list, prevKey) + 1 : 0
    list.splice(index, 0, createRecord(snapshot))
    this.setCurrent(list)
  }

  onRemove = (snapshot) => {
    const list = this.getCurrent()
    const index = indexForKey(list, snapshot.key)
    list.splice(index, 1)
    this.setCurrent(list)
  }

  onChange = snapshot => {
    const list = this.getCurrent()
    const index = indexForKey(list, snapshot.key)
    list.splice(index, 1, createRecord(snapshot))
    this.setCurrent(list)
  }

  onMove = (snapshot, prevKey) => {
    const list = this.getCurrent()
    const index = indexForKey(list, snapshot.key)
    const record = list.splice(index, 1)[0]
    const newIndex = prevKey ? indexForKey(list, prevKey) + 1 : 0
    list.splice(newIndex, 0, record)
    this.setCurrent(list)
  }

  onObserve () {
    this.setCurrent([])
    this.ref.on('child_added', this.onAdd, this.onError)
    this.ref.on('child_removed', this.onRemove, this.onError)
    this.ref.on('child_changed', this.onChange, this.onError)
    this.ref.on('child_moved', this.onMove, this.onError)
  }

  onUnobserve () {
    this.ref.off('child_added', this.onAdd)
    this.ref.off('child_removed', this.onRemove)
    this.ref.off('child_changed', this.onChange)
    this.ref.off('child_moved', this.onMove)
  }

  onError = (error) => {
    this.setError(error)
  }

}

export default FirebaseList
