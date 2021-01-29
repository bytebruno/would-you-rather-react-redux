export const ALL_AVATARS = ['av1','av2','av3','av4','av5','av6','av7']

export const getAvatar = (name) => {
    if (name === undefined) return require(`../assets/images/av/av1.svg`).default
    return require(`../assets/images/av/${name}.svg`).default
}
