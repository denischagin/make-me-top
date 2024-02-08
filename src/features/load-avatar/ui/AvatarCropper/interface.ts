export interface AvatarCropperProps {
    image: File | null;
    onSave: (croppedImage: File) => void;
}
