/**
 * Created by chinlam on 2015/10/4.
 */

app.controller('profileController', function () {
    this.volunteer = volunteer;
    this.profile = profile;


});

//left bar volunteer info
var volunteer = {
    image: "../../../assets/img/profile.png",
    name: "Jim Lim",
    introduction: "I'm a genius. I work on Data science/analytics and have excellent skills with Matlab and Ruby programming. My hobbies is sporting.",
    participating: "3",
    participated: "8",
    };
//array for volunteer profile

var profile = {
    about:{
        firstName: "Lin",
        lastName: "Jim",
        userName: "jimlin",
        gender: "Male",
        address: "128 Academia Road, Section2, Nankang Dist.",
        birthDate: "1990/05/05",
        city: "Taipei City"
    },
    contact: {
        phoneNumber: "0912345678",
        emailAddress: "jimlin@citi.sinica.edu.tw",
        emergencyContact: "Jeremy Lin",
        emergencyPhone: "0919119119"
    },
    experience: {
        researchAssistant: "Research assistant",
        position: "Academia Sinica",
        date: "2014-now"
    },
    education: {
        background: "Master's degree, Computer science",
        school: "NCKU",
        schoolDate: "2012-2014"
    },
    skills:["Swimming","Programming"],
    equipments: ["Car", "Scooter", "Camera"]

};


