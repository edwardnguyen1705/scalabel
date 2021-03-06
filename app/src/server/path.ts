import moment from 'moment'
import * as os from 'os'
import * as path from 'path'
import { index2str } from '../common/util'
import { BotData } from '../types/message'
import { StorageStructure } from './storage'

/**
 * Converts task id to name of the room for that id
 * If sync is off, room is separated by sessionId
 */
export function getRoomName (
  projectName: string, taskId: string,
  sync: boolean, sessionId = ''): string {
  if (sync) {
    return `project${projectName}-task${taskId}`
  } else {
    return `project${projectName}-task${taskId}-session${sessionId}`
  }
}

/**
 * Get formatted timestamp
 */
export function now (): string {
  return moment().format('YYYY-MM-DD_HH-mm-ss')
}

/**
 * Read hostname from os
 */
export function hostname (): string {
  return os.hostname()
}

/**
 * Creates path for a timestamped file
 */
export function getFileKey (filePath: string): string {
  return `${filePath}/${now()}`
}

/**
 * Creates a temporary directory for tests
 */
export function getTestDir (testName: string): string {
  return `${testName}-${now()}`
}

/**
 * Gets path for user data
 */
export function getUserKey (project: string): string {
  return `${project}/userData`
}

/**
 * Gets path for meta data on user
 */
export function getMetaKey (): string {
  return 'metaData'
}

/* path to html file directories, relative to js
 * note that ../ corresponds to index.html
 */
export const HTML_DIRS: string[] = ['../html']

/**
 * Converts relative (to js) path into absolute path
 */
export function getAbsSrcPath (relativePath: string) {
  return path.join(__dirname, relativePath)
}

/**
 * Get name for export download
 * @param {string} projectName
 */
export function getExportName (projectName: string): string {
  return `${projectName}_export_${now()}.json`
}

/**
 * Get redis key for associated metadata
 * this means data that doesn't get written back to storage
 */
export function getRedisMetaKey (key: string) {
  return `${key}:meta`
}

/**
 * Get redis key for reminder metadata
 */
export function getRedisReminderKey (key: string) {
  return `${key}:reminder`
}

/**
 * Convert redis metadata or reminder key to redis base key
 */
export function getRedisBaseKey (metadataKey: string) {
  return metadataKey.split(':')[0]
}

/**
 * Check redis key is a reminder key
 */
export function checkRedisReminderKey (key: string): boolean {
  return key.split(':')[1] === 'reminder'
}

/**
 * Gets the redis key used by bots for the task
 */
export function getRedisBotKey (botData: BotData) {
  const projectName = botData.projectName
  const taskId = index2str(botData.taskIndex)
  return `${projectName}:${taskId}:botKey`
}

/**
 * The name of the set of bot user keys
 */
export function getRedisBotSet () {
  return 'redisBotSetName'
}

/**
 * Gets key of file with project data
 */
export function getProjectKey (projectName: string) {
  return path.join(StorageStructure.PROJECT, projectName, 'project')
}

/**
 * Gets key of file with task data
 */
export function getTaskKey (projectName: string, taskId: string): string {
  return path.join(getTaskDir(projectName), taskId)
}

/**
 * Gets directory with task data for project
 */
export function getTaskDir (projectName: string): string {
  return path.join(StorageStructure.PROJECT, projectName, 'tasks')
}

/**
 * Gets name of submission directory for a given task
 * @param projectName
 * @param task
 */
export function getSaveDir (projectName: string, taskId: string): string {
  return path.join(StorageStructure.PROJECT, projectName, 'saved', taskId)
}

/**
 * Gets path to redis config
 */
export function getRedisConf (): string {
  return path.join('app', 'config', 'redis.conf')
}
