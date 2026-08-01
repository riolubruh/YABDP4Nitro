export default new class CustomUserProfileStore {
    private profiles: UserProfile[] = [];

    getMember(id: string)
    {
        this.profiles.find(x => x.userId == id)
    }

    cacheMember(user: UserProfile)
    {
        this.profiles.push(user);
    }
}