import { Atom } from 'mobx'

abstract class BaseValue<T> {

  abstract onObserve (): void
  abstract onUnobserve(): void

  private _error?: Error
  private _current: T
  private atom: Atom

  constructor () {
    this.atom = new Atom('Firebase', this.onObserve.bind(this), this.onUnobserve.bind(this))
  }

  getCurrent () {
    return this._current
  }

  setCurrent = (value: T) => {
    this._current = value
    this.atom.reportChanged()
  }

  setError = (error) => {
    this._error = error
    this.atom.reportChanged()
  }

  hasError () {
    if (this.atom.reportObserved()) {
      return !!this._error
    }
    return false
  }

  error () {
    return this._error
  }

  current() {
    if (this.atom.reportObserved()) {
      return this._current
    }
    throw new Error('No observers')
  }

}

export default BaseValue
