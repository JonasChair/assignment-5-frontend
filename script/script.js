import { buildContent, API_URL, log, buildMessageWrapper } from "./src/sharedFuctions.js";

const getLogs = (pet) => {
    window.location.replace(`./html/logs.html?id=${pet.id}`);
}

const deletePet = async (pet, event) => {
    const response = await fetch(`${API_URL}/pets/${pet.id}`, {
        method: `DELETE`
    })
    const deletedPet = await response.json();
    if (deletedPet.status === true) {
        event.target.innerText = 'Pet was archived, updating in 2 seconds';
        event.target.style = 'color: green';
        setTimeout(() => {
            document.getElementById('main').innerHTML = '';
            buildContent(`${API_URL}/pets`, buildPetsWrapper, 'main', 'pets');
        }, 2000)
    } else {
        event.target.innerText = 'Could not delete the pet';
    }
}

const buildPetWrapper = (pet) => {
    const petWrapper = document.createElement(`div`);
    petWrapper.classList.add(`pet-wrapper`);

    const petName = document.createElement(`h3`);
    petName.innerText = pet.name;

    const petDateOfBirth = document.createElement(`h4`);
    petDateOfBirth.innerText = pet.dob.split('T')[0];

    const petOwnerEmail = document.createElement(`h5`);
    petOwnerEmail.innerText = pet.client_email;

    const petTextWrapper = document.createElement(`div`);
    petTextWrapper.classList.add(`pet-text-wrapper`);

    const petButtonWrapper = document.createElement(`div`);
    petButtonWrapper.classList.add(`pet-button-wrapper`);

    const deleteButton = document.createElement(`button`);
    deleteButton.classList.add(`delete-button`);
    deleteButton.innerText = `Archive this pet`;
    deleteButton.addEventListener(`click`, (event) => deletePet(pet, event));

    const petLogsButton = document.createElement(`button`);
    petLogsButton.classList.add(`logs-button`);
    petLogsButton.innerText = `View logs`;
    petLogsButton.addEventListener(`click`, () => getLogs(pet));

    petTextWrapper.append(petName, petDateOfBirth, petOwnerEmail);
    petButtonWrapper.append(petLogsButton, deleteButton);
    petWrapper.append(petTextWrapper, petButtonWrapper);

    return petWrapper;
}

const buildPetsWrapper = (data) => {
    const petsWrapper = document.createElement(`div`);
    petsWrapper.classList.add(`pets-wrapper`);
    data
        .forEach((pet) => {
            const petWrapper = buildPetWrapper(pet);
            petsWrapper.append(petWrapper);
        });
    return petsWrapper;
}

buildContent(`${API_URL}/pets`, buildPetsWrapper, 'main', 'pets');