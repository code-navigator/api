var config = {
  //mssql connection settings (home)
   visualDb: {
    user: 'mark',
    password: 'password',
    host: 'localhost',
    db: 'Cygnus'
  },
  fileboundDb: {
    user: 'FBADMIN',
    password: 'filebound',
    host: 'DM01',
    db: 'Filebound',
  },
  paths: {
    filebound: '\\\\Dm01\\e$\\FILEBOUND REPOSITORY\\'
  }

  // mssql connection settings (work)
  // visualDb: {
  //   user: 'sa',
  //   password: 'N@4u2C0k!',
  //   host: 'SQ03',
  //   db: 'Cygnus'
  // },
  // fileboundDb: {
  //   user: 'FBADMIN',
  //   password: 'filebound',
  //   host: 'DM01',
  //   db: 'Filebound',
  // },
  // paths: {
  //   filebound: '\\\\Dm01\\e$\\FILEBOUND REPOSITORY\\'
  // }
}

module.exports = config