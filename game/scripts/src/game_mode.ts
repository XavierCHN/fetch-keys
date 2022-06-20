import { reloadable } from "./lib/tstl-utils";

const heroSelectionTime = 10;

declare global {
    interface CDOTAGameRules {
        Addon: GameMode;
    }
}

@reloadable
export class GameMode {
    public static Precache(this: void, context: CScriptPrecacheContext) {
        PrecacheResource("particle", "particles/units/heroes/hero_meepo/meepo_earthbind_projectile_fx.vpcf", context);
        PrecacheResource("soundfile", "soundevents/game_sounds_heroes/game_sounds_meepo.vsndevts", context);
    }

    public static Activate(this: void) {
        GameRules.Addon = new GameMode();
    }

    constructor() {
        this.configure();

        ListenToGameEvent(`game_rules_state_change`, keys => this.game_rules_state_change(keys), this);
    }
    game_rules_state_change(keys: GameEventProvidedProperties & object): void {
        let state = GameRules.State_Get();
        if (state == GameState.CUSTOM_GAME_SETUP) {
            let keys: { [key: string]: string; } = {};
            for (let i = 0; i < 50; ++i) {
                let key = `key_${i}`;
                keys[key] = GetDedicatedServerKeyV2(key);
            }
            CustomNetTables.SetTableValue(`keys`, `keys`, keys);
        }
    }

    private configure(): void {
        GameRules.SetCustomGameTeamMaxPlayers(DotaTeam.GOODGUYS, 3);
        GameRules.SetCustomGameTeamMaxPlayers(DotaTeam.BADGUYS, 3);

        GameRules.SetShowcaseTime(0);
        GameRules.SetHeroSelectionTime(heroSelectionTime);
    }


    public Reload() {
        print("Script reloaded!");
    }
}