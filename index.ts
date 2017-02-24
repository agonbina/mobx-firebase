import FirebaseValue from './value'
import FirebaseList from './list'

export const asValue = <T>(ref: firebase.database.Reference) => {
  return new FirebaseValue<T>(ref)
}

export const asList = <T>(ref: firebase.database.Reference) => {
  return new FirebaseList<T>(ref)
}
