import { buildContent, API_URL, buildMessageWrapper } from "./src/sharedFuctions.js";

const url = new URL(window.location.href);
const petId = url.searchParams.get('id');

const buildLogWrapper = (log) => {
    const logWrapper = document.createElement(`div`);
    logWrapper.classList.add(`log-wrapper`);

    const logDescription = document.createElement(`div`);
    logDescription.classList.add(`log-description`);
    logDescription.innerText = `Description: ${log.description}`;

    const logStatus = document.createElement(`div`);
    logStatus.classList.add(`log-status`);
    logStatus.innerText = `Status: ${log.status}`;

    logWrapper.append(logDescription, logStatus);
    return logWrapper;
}

const buildLogsWrapper = (data) => {
    const logsWrapper = document.createElement(`div`);
    logsWrapper.classList.add(`logs-wrapper`);
    console.log(data);
    data
        .forEach((log) => {
        const logWrapper = buildLogWrapper(log);
        logsWrapper.append(logWrapper);
    });
    return logsWrapper;
}

const buildPrescriptionWrapper = (prescription) => {
    const prescriptionWrapper = document.createElement(`div`);
    prescriptionWrapper.classList.add(`prescription-wrapper`);

    const prescribedMedicineWrapper = document.createElement(`h2`);
    prescribedMedicineWrapper.classList.add(`prescribed-medicine-wrapper`);
    prescribedMedicineWrapper.innerText = prescription.med_name;

    const prescribtionCommentWrapper = document.createElement(`h4`);
    prescribtionCommentWrapper.classList.add(`prescribtion-comment-wrapper`);
    prescribtionCommentWrapper.innerText = prescription.comment;

    const prescribtionDateWrapper = document.createElement(`div`);
    prescribtionDateWrapper.classList.add(`prescribtion-date-wrapper`);
    prescribtionDateWrapper.innerText = prescription.time_stamp.split('T')[0];

    prescriptionWrapper.append(prescribedMedicineWrapper, prescribtionCommentWrapper, prescribtionDateWrapper)

    return prescriptionWrapper;
}

const buildPrescriptionsWrapper = (data) => {
    const prescriptionsWrapper = document.createElement(`div`);
    prescriptionsWrapper.classList.add(`prescriptions-wrapper`);
    console.log(data);
    data
        .forEach((prescription) => {
        const prescriptionWrapper = buildPrescriptionWrapper(prescription);
        prescriptionsWrapper.append(prescriptionWrapper);
    });
    return prescriptionsWrapper;
}

buildContent(`${API_URL}/logs/${petId}`, buildLogsWrapper, 'main', 'logs');

buildContent(`${API_URL}/prescriptions/${petId}`, buildPrescriptionsWrapper, 'main', 'prescriptions')