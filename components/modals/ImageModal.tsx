'use client';

import Image from 'next/image';
import { FC } from 'react';

import Modal from './Modal';

interface ImageModalProps {
	isOpen?: boolean;
	onClose: () => void;
	src?: string | null;
}

const ImageModal: FC<ImageModalProps> = ({ src, isOpen, onClose }) => {
	if (!src) {
		return null;
	}
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className="h-80 w-80">
				<Image
					src={src}
					alt="Image"
                    fill
					className="object-cover"
				/>
			</div>
		</Modal>
	);
};

export default ImageModal;
