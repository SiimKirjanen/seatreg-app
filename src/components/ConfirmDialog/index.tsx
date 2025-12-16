import React from 'react';
import { Text } from 'react-native';
import { Dialog, Button } from '@rneui/themed';

export interface ConfirmDialogProps {
    visible: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    loading?: boolean;
    onConfirm: () => void | Promise<void>;
    onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    visible,
    title,
    message,
    confirmText = 'Yes',
    cancelText = 'No',
    loading = false,
    onConfirm,
    onCancel,
}) => {
    return (
        <Dialog isVisible={visible} onBackdropPress={onCancel}>
            <Dialog.Title title={title} />
            <Text>{message}</Text>

            <Dialog.Actions>
                <Button
                    title={cancelText}
                    type="clear"
                    onPress={onCancel}
                    disabled={loading}
                />
                <Button
                    title={confirmText}
                    loading={loading}
                    disabled={loading}
                    onPress={onConfirm}
                />
            </Dialog.Actions>
        </Dialog>
    );
};

export default ConfirmDialog;