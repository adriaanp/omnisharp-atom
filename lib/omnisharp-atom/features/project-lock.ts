import path = require('path');
import OmniSharpServer = require('../../omni-sharp-server/omni-sharp-server');
import Omni = require('../../omni-sharp-server/omni');
import OmniSharpAtom = require('../omnisharp-atom');

var glob = require('glob');
import _ = require('lodash');
var pw = require('pathwatcher');
import ek = require('event-kit');

interface ProjectLock {
  filename: string;
  changed: ek.Disposable;
  renamed: ek.Disposable;
  deleted: ek.Disposable;
}

class FileMonitor {
  private disposables: ek.CompositeDisposable;
  private files: ProjectLock[];

  constructor() {
    this.disposables = new ek.CompositeDisposable();
    this.files = [];
  }

  public activate() {
      atom.emitter.on("omni-sharp-server:start", data => {
          this.monitor(data.path);
      });
  }

  public deactivate() {
    this.disposables.dispose();
    this.files = [];
  }


  public monitor(location: string) {

    glob(location + '/**/*/project.json', (er, files) => {
        console.log(files);
        _.each(files, (file, index) => {

          var dirname = path.dirname(file.toString());
          var filename = dirname + path.sep + "project.lock.json";

          if (_.findIndex(this.files, f => f.filename === filename) === -1) {

            var file = new pw.File(filename);

            file.exists()
            .then(exists => {
              if (exists) {

                var filelock = { filename: filename };

                filelock.changed = file.onDidChange(() => {
                    if (!OmniSharpServer.vm.isOff) {
                      Omni.filesChanged(filename);
                    }
                });

                filelock.deleted = file.onDidDelete(() => {
                  //TODO: remove subscriber and watch dir
                  filelock.changed.dispose();
                  filelock.deleted.dispose();
                  filelock.renamed.dispose();
                  this.files.remove(filelock);
                });

                filelock.renamed = file.onDidRename(() => {
                  //TODO: remove subscriber and watch dir
                  filelock.changed.dispose();
                });

                this.files.push(filelock);
              }
            });
          }

        });

    });
  }

};

export = FileMonitor;
