import path = require('path');
import OmniSharpServer = require('./omni-sharp-server');
import Omni = require('./omni');
import OmniSharpAtom = require('../omnisharp-atom/omnisharp-atom');
import finder = require('./project-finder');
var glob = require('glob');
import _ = require('lodash');
var pw = require('pathwatcher');


class FileMonitor {

  public monitor(location: string) {
    //this.server = OmniSharpServer;
    //this.omni = Omni;

    console.log(location);
    glob(location + '/**/*/project.json', (er, files) => {
        console.log(files);
        _.each(files, (file, index) => {

          var dirname = path.dirname(file.toString());
          var filename = dirname + path.sep + "project.lock.json";

          var file = new pw.File(filename);

          file.exists()
          .then(exists => {
            if (exists) {
              file.onDidChange(() => {
                console.log("file changed");
                /*if (!this.server.vm.isOff) {
                    this.omni.packageRestore();
                }*/
              });
            }
          });

          //TODO: need to watch directory when file does not exists
          file.onDidRename(() => console.log("file renamed"));
          file.onDidDelete(() => console.log("file deleted"));
          file.onWillThrowWatchError(() => console.log("throw watch error"));

          /*dir.onDidChange(function(event, path) {
            console.log("directory changes");
            console.log(event);
            console.log(path);
          });*/

        });

    });
  }

};

export = FileMonitor;
