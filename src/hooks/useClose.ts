import { useEffect } from 'react';

type UseCloseProps = {
	isOpen: boolean;
	onClose: () => void;
	rootRef: React.RefObject<HTMLElement>;
};

export function useClose({ isOpen, onClose, rootRef }: UseCloseProps) {
	useEffect(() => {
		if (!isOpen) {
			return;
		}

		const handleEscapePress = (e: KeyboardEvent) => {
			e.key === 'Escape' && onClose();
		};

		const handleOutsideClick = (event: MouseEvent) => {
			const clickedElement = event.target;
			const isClickOutside =
				clickedElement instanceof Node &&
				rootRef.current &&
				!rootRef.current.contains(clickedElement);

			isClickOutside && onClose();
		};

		document.addEventListener('keydown', handleEscapePress);
		document.addEventListener('mousedown', handleOutsideClick);

		return () => {
			document.removeEventListener('keydown', handleEscapePress);
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [isOpen, onClose, rootRef]);
}
