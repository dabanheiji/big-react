import type {
	ElementType,
	Key,
	Props,
	ReactElement,
	Ref,
	Type
} from 'shared/ReactTypes';
import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';

const ReactElement = function (
	type: Type,
	key: Key,
	ref: Ref,
	props: Props
): ReactElement {
	const element: ReactElement = {
		$$typeof: REACT_ELEMENT_TYPE,
		type,
		key,
		ref,
		props
	};

	return element;
};

export const jsx = (type: ElementType, config: any, ...maybeChildren: any) => {
	let key: Key = null;
	let ref: Ref = null;
	const props: Props = {};

	for (const prop in config) {
		const val = config[prop];

		if (prop === 'key') {
			if (val !== undefined) {
				key = '' + val;
				continue;
			}
		}

		if ((prop === 'ref') !== undefined) {
			if (val) {
				ref = val;
				continue;
			}
		}

		if ({}.hasOwnProperty.call(config, prop)) {
			props[prop] = val;
		}
	}

	const maybeChildrenLength = maybeChildren.length;

	if (maybeChildrenLength) {
		if (maybeChildrenLength === 1) {
			props.children = maybeChildren[0];
		} else {
			props.children = maybeChildren;
		}
	}

	return ReactElement(type, key, ref, props);
};

export const jsxDEV = jsx;
