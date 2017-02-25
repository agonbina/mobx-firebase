declare module 'mobx-firebase/base' {
	 abstract class BaseValue<T> {
	    abstract onObserve(): void;
	    abstract onUnobserve(): void;
	    private _error?;
	    private _current;
	    private atom;
	    constructor();
	    getCurrent(): T;
	    setCurrent: (value: T) => void;
	    setError: (error: any) => void;
	    hasError(): boolean;
	    error(): Error | undefined;
	    current(): T;
	}
	export default BaseValue;

}
declare module 'mobx-firebase/value' {
	import firebase from 'firebase';
	import BaseValue from 'mobx-firebase/base'; class FirebaseValue<T> extends BaseValue<T> {
	    private ref;
	    constructor(ref: firebase.database.Reference);
	    private onValue;
	    onObserve(): void;
	    onUnobserve(): void;
	}
	export default FirebaseValue;

}
declare module 'mobx-firebase/list' {
	import firebase from 'firebase';
	import BaseValue from 'mobx-firebase/base'; class FirebaseList<T> extends BaseValue<Array<T>> {
	    private ref;
	    constructor(ref: firebase.database.Reference);
	    onAdd: (snapshot: any, prevKey: any) => void;
	    onRemove: (snapshot: any) => void;
	    onChange: (snapshot: any) => void;
	    onMove: (snapshot: any, prevKey: any) => void;
	    onObserve(): void;
	    onUnobserve(): void;
	    onError: (error: any) => void;
	}
	export default FirebaseList;

}
declare module 'mobx-firebase/index' {
	import FirebaseValue from 'mobx-firebase/value';
	import FirebaseList from 'mobx-firebase/list';
	export const asValue: <T>(ref: firebase.database.Reference) => FirebaseValue<T>;
	export const asList: <T>(ref: firebase.database.Reference) => FirebaseList<T>;

}
declare module 'mobx-firebase' {
	import main = require('mobx-firebase/index');
	export = main;
}
