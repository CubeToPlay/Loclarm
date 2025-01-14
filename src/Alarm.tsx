import Storage from "./Storage";
import uuid from 'react-native-uuid';

export interface AlarmData {
    id: string,
    name: string,
    enabled: boolean,
    repeat: boolean,
    custom: boolean,
    cron: string,
};

namespace Alarm {
    const alarms : Map<string, AlarmData> = new Map<string, AlarmData>();
    const callbacks : Set<() => void> = new Set();

    export function createAlarm(alarm : AlarmData) : void {
        alarms.set(alarm.id, alarm);
        invokeCallbacks();
    }

    export function updateAlarm(alarm : AlarmData) : void {
        createAlarm(alarm);
    }

    export function deleteAlarm(alarm : AlarmData) : void {
        alarms.delete(alarm.id);
        invokeCallbacks();
    }

    export function getAlarm(id : string) : AlarmData | undefined {
        return alarms.get(id); 
    }

    export function getAllAlarms() : Array<AlarmData> {
        return Array.from(alarms.values());
    }

    export async function load() {
        alarms.clear();
        const data = await Storage.getData();
        if (data) {
            const loaded : Array<AlarmData> = JSON.parse(data);
            loaded.map(alarm => alarms.set(alarm.id, alarm));
        }
    }

    export async function store() {
        await Storage.saveData(JSON.stringify(getAllAlarms()));
    }

    export function newAlarm(name: string) : AlarmData {
        return {
            id: uuid.v4(),
            name: name,
            enabled: true,
            cron: "* * * * *",
            custom: false,
            repeat: false
        }
    }

    export function useCallback(func: () => void) {
        callbacks.add(func);
    }

    function invokeCallbacks() {
        callbacks.forEach(func => func());
    }
}

export default Alarm;