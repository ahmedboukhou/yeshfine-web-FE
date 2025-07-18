import { type FC } from 'react';
import type { FileWithPath } from 'react-dropzone';
import { IMGIcon, PDFIcon, RemoveIcon } from '../../../assets/icons';
import { getFileSize } from '../../../lib/helpers';

type FilePreviewProps = {
	file: FileWithPath;
	isImage: boolean;
	handleDelete?: (fileToDelete: FileWithPath) => void;
};
export const FilePreview: FC<FilePreviewProps> = ({ file, isImage, handleDelete }) => {
	return (
		<div className="col-span-1 rounded-xl border border-border-1 p-4">
			<div className="flex items-start gap-5">
				<div className="relative w-8">
					{isImage ? <IMGIcon /> : <PDFIcon />}
					<span className="!text-[9px] font-bold uppercase absolute top-7 left-3 text-white">
						{file.type.split('/')[1]}
					</span>
				</div>
				<div className="flex-items-center flex-1 min-w-0 justify-between gap-2">
					<div className="flex flex-col gap-1 min-w-0">
						<span className="text-typography-700 font-medium truncate whitespace-nowrap overflow-hidden">
							{file.name}
						</span>
						<span className="text-typography-600 truncate whitespace-nowrap overflow-hidden">
							{getFileSize(file.size)}
						</span>
					</div>
					{handleDelete && (
						<div className="flex items-center justify-end">
							<div className="cursor-pointer" onClick={() => handleDelete(file)}>
								<RemoveIcon />
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
