import React, { useState, useEffect } from 'react';
import { me } from '../api/apiClient';
import { updateUser } from '../api/apiClient';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [editingUser, setEditingUser] = useState(null);
    const [editedUser, setEditedUser] = useState({});

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await me(); // Appelle la méthode me() avec le token
                setUserData(response.data); // Met à jour les données utilisateur
                console.log("Mon Profil: ", response.data);
            } catch (error) {
                setError("Erreur lors de la récupération du profil.");
                console.error("Erreur lors de la récupération du profil :", error);
            }
        };
        fetchProfile();
    }, []);

    const handleActionButton = (user) => {
        // Initialiser l'état d'édition avec les valeurs actuelles de l'utilisateur
        setEditingUser(user);
        setEditedUser({
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            name: user.name,
            birthdate: user.birthdate,
            gender: user.gender
        });
    };

    const handleSaveChanges = async () => {
        try {
            console.log("editingUser avant mise à jour:", editingUser);
            console.log("editedUser:", editedUser);
            
            // Vérifier si editingUser est null ou undefined
            if (!editingUser) {
                console.error("editingUser est null ou undefined");
                return;
            }

            // Création d'un objet avec les valeurs modifiées
            const updatedUser = {
                username: editedUser.username,
                email: editedUser.email,
                firstName: editedUser.firstName,
                name: editedUser.name,
                birthdate: editedUser.birthdate,
                gender: editedUser.gender
            };

            // Appel API pour mettre à jour l'utilisateur
            const response = await updateUser(updatedUser);

            // Mettre à jour les données utilisateur
            setUserData(response.data);
            setEditingUser(null); // Fermer le mode édition
        } catch (error) {
            console.error('Erreur lors de la mise à jour:', error);
        }
    };

    const handleInputChange = (field, value) => {
        setEditedUser(prev => ({
            ...prev,
            [field]: value
        }));
    };

    if (error) return <p>{error}</p>;
    if (!userData) return <p>Chargement...</p>;

    return (
        <div>
            <h2>Mon profil</h2>
            
            {editingUser ? (
                <div className="edit-form">
                    <h3>Modifier mon profil</h3>
                    
                    <div>
                        <label>Username:</label>
                        <input 
                            value={editedUser.username} 
                            onChange={(e) => handleInputChange('username', e.target.value)} 
                        />
                    </div>
                    
                    <div>
                        <label>Email:</label>
                        <input 
                            value={editedUser.email} 
                            onChange={(e) => handleInputChange('email', e.target.value)} 
                        />
                    </div>
                    
                    <div>
                        <label>First Name:</label>
                        <input 
                            value={editedUser.firstName} 
                            onChange={(e) => handleInputChange('firstName', e.target.value)} 
                        />
                    </div>
                    
                    <div>
                        <label>Name:</label>
                        <input 
                            value={editedUser.name} 
                            onChange={(e) => handleInputChange('name', e.target.value)} 
                        />
                    </div>
                    
                    <div>
                        <label>Birthdate:</label>
                        <input 
                            value={editedUser.birthdate} 
                            onChange={(e) => handleInputChange('birthdate', e.target.value)} 
                        />
                    </div>
                    
                    <div>
                        <label>Gender:</label>
                        <input 
                            value={editedUser.gender} 
                            onChange={(e) => handleInputChange('gender', e.target.value)} 
                        />
                    </div>
                    
                    <div className="edit-actions">
                        <button type="button" onClick={handleSaveChanges}>Enregistrer</button>
                        <button type="button" onClick={() => setEditingUser(null)}>Annuler</button>
                    </div>
                </div>
            ) : (
                <div>
                    <ul>
                        <li><strong>Username:</strong> {userData.username}</li>
                        <li><strong>Mail:</strong> {userData.email}</li>
                        <li><strong>First Name:</strong> {userData.firstName}</li>
                        <li><strong>Name:</strong> {userData.name}</li>
                        <li><strong>Birthdate:</strong> {userData.birthdate}</li>
                        <li><strong>Gender:</strong> {userData.gender}</li>
                        <li><strong>Role:</strong> {userData.roles[0].name}</li>
                    </ul>
                    <button onClick={() => handleActionButton(userData)}>Modifier</button> {/* Il manque juste updateUser pour que ca fonctionne */}
                </div>
            )}
        </div>
    );
};

export default Profile;
