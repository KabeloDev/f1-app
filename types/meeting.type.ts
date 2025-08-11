export interface Meeting {
   meeting_key?: number,
   circuit_short_name?: string,
   country_name?: string,
   meeting_official_name?: string,
   date_start?: string,
   year?: string
}

export async function fetchMeetings(): Promise<Meeting[]> {
   const response = await fetch(process.env.EXPO_PUBLIC_MEETINGS_URL!);
   const data: Meeting[] = await response.json();
   const uniqueMeetingsMap = new Map<number, Meeting>();

   if (!response.ok) {
      console.error('Error status code: ', response.status);
   }

   for (const meeting of data) {
      if (
         meeting.meeting_key &&
         !uniqueMeetingsMap.has(meeting.meeting_key)
      ) {
         uniqueMeetingsMap.set(meeting.meeting_key, meeting);
      }
   }

   const uniqueMeetings = Array.from(uniqueMeetingsMap.values());

   return uniqueMeetings;
};