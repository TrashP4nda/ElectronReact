
import React, { useState, useEffect } from 'react';
import { TextField, Button, Dialog, DialogContent, DialogTitle, Stack } from '@mui/material';

interface IncidenceData {
    autonomousRegion: string;
    carRegistration: string;
    cause: string;
    cityTown: string;
    direction: string;
    endDate: string;
    incidenceDescription: string;
    incidenceID?: string;
    incidenceLevel: string;
}

interface EditIncidenceFormProps {
    open: boolean;
    onClose: () => void;
    incidenceData: IncidenceData | null;
}

const updateIncidence = async (IncidenceID : string, token: string, incidenceData: IncidenceData) => {
    try {
        const url = `http://192.168.1.134:5009/api/incidencias/${IncidenceID}`;
        const formData = new FormData();
    
        for (const [key, value] of Object.entries(incidenceData)) {
            formData.append(key, value);
        }
    
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });
    
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
    
        return await response.json();
    } catch (error) {
        console.error('Failed to update incidence:', error);
        throw error;
    }
};

const EditIncidenceForm: React.FC<EditIncidenceFormProps> = ({ open, onClose, incidenceData }) => {
    const [formData, setFormData] = useState<IncidenceData>({
        autonomousRegion: '',
        carRegistration: '',
        cause: '',
        cityTown: '',
        direction: '',
        endDate: '',
        incidenceDescription: '',
        incidenceID: '',
        incidenceLevel: '',
    });

    useEffect(() => {
        if (incidenceData) {
            setFormData({ ...incidenceData });
        }
    }, [incidenceData]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                return;
            }

            const { incidenceID, ...updateData } = formData;

            if (incidenceID) {
                await updateIncidence(incidenceID,token, updateData);
            }
            
            onClose(); // Close the dialog after a successful update
        } catch (error) {
            console.error('Error updating incidence:', error);
        }
    };
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" >
            <DialogTitle>Edit Incidence</DialogTitle>
            <DialogContent>
                <Stack spacing={2} direction={'column'}>
                    <TextField
                        label="Autonomous Region"
                        name="autonomousRegion"
                        value={formData.autonomousRegion}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Car Registration"
                        name="carRegistration"
                        value={formData.carRegistration}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Cause"
                        name="cause"
                        value={formData.cause}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="City/Town"
                        name="cityTown"
                        value={formData.cityTown}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Direction"
                        name="direction"
                        value={formData.direction}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="End Date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="Description"
                        name="incidenceDescription"
                        value={formData.incidenceDescription}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                    />
                    <TextField
                        label="Incidence ID"
                        name="incidenceID"
                        value={formData.incidenceID}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        disabled // Assuming this is an ID and should not be editable
                    />
                    <TextField
                        label="Incidence Level"
                        name="incidenceLevel"
                        value={formData.incidenceLevel}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />



                    {/* Repeat for other fields */}
                    <Button onClick={handleSubmit} variant="contained">
                        Save Changes
                    </Button>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

export default EditIncidenceForm;
