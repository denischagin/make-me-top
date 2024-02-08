export interface AvatarCropperProps {
    image: File | null;
    onSave: (croppedImage: Blob) => void;
}
