import { useCallback, useMemo, type FC } from 'react';
import { useDropzone, type FileWithPath } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { UploadIcon } from '../../../assets/icons';
import { FilePreview } from './FilePreview';

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
			<FilePreview key={file.path} isImage={isImage} file={file} handleDelete={handleDelete} />
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
