let personnalData = {
    template: `<div>
    <h3>Données personnelles</h3>
    <p>Nom Complet :  {{firstname}} {{lastname}}</p>
    <p>Adresse : {{adress}}</p>
    <p>Age : {{age}}</p>
    <p >Voiture : <span v-if="car == true">Véhiculé</span><span v-else style="color:red">Non Véhiculé</span></p>
    </div>
    `,

    computed: {
        age: function () {
            let today = new Date();
            let birthday = new Date(this.birthday);
            let diff = today.getTime() - birthday.getTime();
            return (this.birthday === '' ? '' : Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25)));
        }
    },
    props: ['firstname', 'lastname', 'birthday', 'adress', 'car', 'age']
};

let training = {
    template: `
        <div>
        <h2>Formation</h2>
            <ul>
                <li v-for="study of studies">{{study.name}}: du {{study.start}} à {{study.end}}</li>
            </ul>
            </div>
    `,

    props: ['studies']
};

let experience = {
    template: `
        <div>
        <h2>Expérience</h2>
            <ul>
                <li v-for="experience of experiences">{{experience.name}}: du {{experience.start}} à {{experience.end}}</li>
            </ul>
            </div>
    `,

    props: ['experiences']
};

let skill = {
    template: `
    <div>
        <h2>Compétances</h2>
            <ul>
                <li v-for="skill of skills">{{skill}}</li>
            </ul>
            </div>
    `,
    props: ['skills']
};

let vm = new Vue({

    el: '#app',
    components: {
        'personnal-data': personnalData,
        'training': training,
        'experience': experience,
        'skill': skill
    },
    data: {
        lastName: '',
        firstName: '',
        birthday: '',
        adress: '',
        car: false,
        studies: [],
        experiences: [],
        skills: []
    },
    created: function () {
        this.loadStoredData();
    },
    methods: {
        addTraining: function () {
            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };
            let study = document.getElementById('study').value;
            let trainingStart = new Date(document.getElementById('trainingStart').value);
            let trainingEnd = new Date(document.getElementById('trainingEnd').value);

            trainingStart = trainingStart.toLocaleDateString('fr-FR', options)
            trainingEnd = trainingEnd.toLocaleDateString('fr-FR', options);
            this.studies.push({
                name: study,
                start: trainingStart,
                end: trainingEnd
            });
            document.getElementById('study').value = '';
            document.getElementById('trainingStart').value = '';
            document.getElementById('trainingEnd').value = '';
        },
        addExperience: function () {
            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };
            let experience = document.getElementById('experience').value
            let experienceStart = new Date(document.getElementById('experienceStart').value).toLocaleDateString('fr-FR', options);
            let experienceEnd = new Date(document.getElementById('experienceEnd').value).toLocaleDateString('fr-FR', options);

            this.experiences.push({
                name: experience,
                start: experienceStart,
                end: experienceEnd
            });
            document.getElementById('experience').value = '';
            document.getElementById('experienceStart').value = '';
            document.getElementById('experienceEnd').value = '';

        },
        addSkills: function () {
            let skill = document.getElementById('skill').value;
            console.log(skill);
            this.skills.push(skill);
            document.getElementById('skill').value = '';
        },
        saveCV: function () {
            localStorage.setItem("cv", JSON.stringify(this.$data));
        },
        deleteCV: function () {
            localStorage.removeItem('cv');
        },
        loadStoredData: function () {
            let data = JSON.parse(localStorage.getItem('cv'));

            for (let key in data) {
                this[key] = data[key];
            }
        }

    },
});