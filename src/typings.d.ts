/* SystemJS module definition */
// declare var module: NodeModule;
// interface NodeModule {
//   	id: string;
// }

declare var app: {
	environment: string
}

declare function require(id: string): any;
