import { beginWork } from './beginWork';
import { completeWork } from './completeWork';
import { FiberNode } from './fiber';

let workInProgress: FiberNode | null = null;

function prepareRefreshStack(fiber: FiberNode) {
	workInProgress = fiber;
}

function renderRoot(root: FiberNode) {
	prepareRefreshStack(root);

	do {
		try {
			workLoop();
			break;
		} catch (error) {
			console.warn('renderRoot 错误', error);
			workInProgress = null;
		}
	} while (true);
}

function workLoop() {
	while (workInProgress !== null) {
		performUnitOfWork(workInProgress);
	}
}

function performUnitOfWork(fiber: FiberNode) {
	const next = beginWork(fiber);
	fiber.memoizedProps = fiber.pendingProps;

	if (next === null) {
		completeUniOfWork(fiber);
	} else {
		workInProgress = next;
	}
}

function completeUniOfWork(fiber: FiberNode) {
	let node = fiber;

	do {
		completeWork(node);
		const sibling = node.sibling;

		if (sibling !== null) {
			workInProgress = sibling;
			return;
		}

		node = node.return as FiberNode;
		workInProgress = node;
	} while (node !== null);
}
