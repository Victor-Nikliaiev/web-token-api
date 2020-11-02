const run = () => {
  eval(
    `
    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
      }
    
    Cheat.RegisterCallback("CreateMove", "aaLoop");
    
    multiplierOptions = [-2, -1, 1, 2];
    
    function aaLoop() {
    AntiAim.SetOverride(1);
    
    //if (getRandomIntInclusive(0, 4)) AntiAim.SetFakeOffset(-10);
    //else if (getRandomIntInclusive(0, 4)) AntiAim.SetFakeOffset(10);
    //else {
    AntiAim.SetFakeOffset(getRandomIntInclusive(20, 40));
    AntiAim.SetRealOffset(getRandomIntInclusive(30, 50) * multiplierOptions[getRandomIntInclusive(0, multiplierOptions.length)]);
    //}
    }
    `
  );
};

const verifyTokenUrl = `https://arhis-webtoken-api.herokuapp.com/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ29ycCBJbmMuIiwiaWF0IjoxNjA0MTk3MjA1LCJleHAiOjE2MDQ4MDIwMDV9.eRbEQu-zGx31sKDvVS1Uuhtjv3Sf08LB82MURM1DBBs`;

class Server {
  async processRequest(url: string) {
    const response = await fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        return data;
      });
    return response;
  }

  varifyToken(url: string) {
    this.processRequest(url).then((data) => {
      if (!data.valid) {
        console.log("Token is not valid");
        return;
      }
      run();
      console.log("Data is cool! Let's go next");
    });
  }
}

const server = new Server();
server.varifyToken(verifyTokenUrl);
