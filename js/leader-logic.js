let groupIndex = 0;
let memberIndex = 0;

function updateUIVal(id, val) {
    document.getElementById(id).innerText = val;
}

function loadMember() {
    const currentGroup = DataStore.groups[groupIndex];
    const currentMember = currentGroup.members[memberIndex];
    
    // 1. Update Progress Text (Overall)
    const totalGroups = DataStore.groups.length;
    document.getElementById('progress-text').innerText = `Group ${groupIndex + 1} of ${totalGroups}`;
    document.getElementById('progress-bar').style.width = `${((groupIndex) / totalGroups) * 100}%`;

    // 2. Update Group Info
    document.getElementById('group-name').innerText = currentGroup.name;
    document.getElementById('member-count').innerText = `PERSON ${memberIndex + 1}/${currentGroup.members.length}`;

    // 3. Update Member Info
    document.getElementById('member-name').innerText = currentMember.name;
    document.getElementById('member-role').innerText = currentMember.role;
    document.getElementById('member-initials').innerText = currentMember.name.split(' ').map(n => n[0]).join('');

    // 4. Reset Form
    document.getElementById('input1').value = 5;
    document.getElementById('input2').value = 5;
    document.getElementById('val1').innerText = 5;
    document.getElementById('val2').innerText = 5;
    document.getElementById('feedback').value = "";

    // 5. Button Label Logic
    const isLastMember = memberIndex === currentGroup.members.length - 1;
    const isLastGroup = groupIndex === DataStore.groups.length - 1;
    
    const btnText = document.getElementById('submit-btn-text');
    if (isLastMember && isLastGroup) {
        btnText.innerText = "Finish All Evaluations";
    } else if (isLastMember) {
        btnText.innerText = "Next Group";
    } else {
        btnText.innerText = "Next Person";
    }

    // Animation
    const card = document.getElementById('group-card');
    card.classList.remove('slide-in');
    void card.offsetWidth; 
    card.classList.add('slide-in');
}

function handleNext() {
    const currentGroup = DataStore.groups[groupIndex];
    
    // Save current member result
    DataStore.results.push({
        memberId: currentGroup.members[memberIndex].id,
        memberName: currentGroup.members[memberIndex].name,
        group: currentGroup.name,
        scores: [
            document.getElementById('input1').value,
            document.getElementById('input2').value
        ],
        notes: document.getElementById('feedback').value
    });

    // NAVIGATION LOGIC
    if (memberIndex < currentGroup.members.length - 1) {
        // Still have people left in this group
        memberIndex++;
    } else if (groupIndex < DataStore.groups.length - 1) {
        // Last person in group, but more groups exist
        groupIndex++;
        memberIndex = 0;
    } else {
        // Everything finished
        showSuccess();
        return;
    }

    loadMember();
}

function showSuccess() {
    console.log("Final Results:", DataStore.results);
    document.getElementById('scoring-container').classList.add('hidden');
    document.getElementById('success-screen').classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', loadMember);