export default new class CustomUserProfileStore {
    private profiles: UserProfile[] = [];

    getMember(id: string, guildId: string): UserProfile
    {
        return this.profiles.find(x => x?.userId == id && x.guildId == guildId);
    }

    cacheMember(user: UserProfile)
    {
        this.profiles.push(user);
    }

    unload(){
        this.profiles = null;
    }
}