import { useCallback, useMemo, type FC } from 'react';
import { useDropzone, type FileWithPath } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { IMGIcon, PDFIcon, RemoveIcon, UploadIcon } from '../../assets/icons';
import { getFileSize } from '../../lib/helpers';

type DropZoneProps = {
	files: FileWithPath[];
	setFiles: React.Dispatch<React.SetStateAction<FileWithPath[]>>;
};

const baseStyle = {
	flex: 1,
	display: 'flex',
	flexDirection: 'column' as const,
	alignItems: 'center',
	padding: '20px',
	borderWidth: 2,
	borderRadius: 12,
	borderColor: '#4CAF50',
	borderStyle: 'dashed',
	backgroundColor: '#EDF7EE',
	outline: 'none',
	cursor: 'pointer',
	transition: 'border .24s ease-in-out',
};

const focusedStyle = {
	borderColor: '#3d8c40',
};

const acceptStyle = {
	borderColor: '#39833c',
};

const rejectStyle = {
	borderColor: '#ff1744',
};

export const DropZone: FC<DropZoneProps> = ({ files, setFiles }) => {
	const { t } = useTranslation(['patient', 'common']);

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			setFiles(acceptedFiles);
		},
		[setFiles]
	);

	const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
		accept: { 'image/*': [], 'application/pdf': [] },
		maxFiles: 1,
		maxSize: 5000000, // 5 MB
		onDrop,
	});
	const handleDelete = useCallback(
		(fileToDelete: FileWithPath) => {
			setFiles((prevFiles) => prevFiles.filter((file) => file.path !== fileToDelete.path));
		},
		[setFiles]
	);
	const style = useMemo(
		() => ({
			...baseStyle,
			...(isFocused ? focusedStyle : {}),
			...(isDragAccept ? acceptStyle : {}),
			...(isDragReject ? rejectStyle : {}),
		}),
		[isFocused, isDragAccept, isDragReject]
	);

	const filePreviews = files.map((file) => {
		const isImage = file.type.startsWith('image/');

		return (
			<div key={file.path} className="col-span-1 rounded-xl border border-border-1 p-4">
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
						<div className="flex items-center justify-end">
							<div className="cursor-pointer" onClick={() => handleDelete(file)}>
								<RemoveIcon />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	});

	return (
		<div>
			<div {...getRootProps({ style })}>
				<input {...getInputProps()} />
				<div className="flex-center flex-col gap-2 h-40">
					<div className="bg-white card-box-shadow p-2.5 rounded-lg">
						<UploadIcon />
					</div>
					<p className="text-primary font-semibold">{t('clickToUpload', { ns: 'common' })}</p>
					<p className="text-primary font-semibold">
						{
							<span className="text-typography-500">
								{t('fileFormatNote', { size: '5MB', ns: 'common' })}
							</span>
						}
					</p>
				</div>
			</div>
			<div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-5">
				{filePreviews}
			</div>
		</div>
	);
};
