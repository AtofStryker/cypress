require('../../spec-helper')

const snapshot = require('snap-shot-it')
const la = require('lazy-ass')
const os = require('os')

/* eslint-env mocha */
/* global sinon */
describe('upload', () => {
  const upload = require('../../binary/upload')

  context('getRemoteManifest', () => {
    it('returns object with download urls for each platform', () => {
      const folder = 'desktop'
      const version = '3.3.0'
      const manifest = upload.getRemoteManifest(folder, version)

      snapshot('test runner manifest', manifest)
    })
  })

  context('getUploadVersionFolder', () => {
    it('returns folder', () => {
      const aws = {
        folder: 'desktop',
      }
      const folder = upload.getUploadVersionFolder(aws, '3.3.0')

      la(folder === 'desktop/3.3.0', 'wrong desktop folder', folder)
    })
  })

  // TODO: update tests this was removed but missing a ton of tests here...
  context.skip('getUploadDirName', () => {
    it('returns folder with platform', () => {
      const aws = {
        folder: 'desktop',
      }

      sinon.stub(upload, 'getAwsObj').returns(aws)
      sinon.stub(os, 'arch').returns('x64')

      const folder = upload.getUploadDirName({
        platform: 'darwin',
        version: '3.3.0',
      })

      la(
        folder === 'desktop/3.3.0/darwin-x64/',
        'wrong upload desktop folder',
        folder,
      )
    })
  })
})
